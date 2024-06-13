function customPromise(executor) {
    let onResolve, onReject, isCalled = false,
        isFulfilled = false, isRejected = false, output, err;
  
    // Then function for handling successful promise execution
    this.then = function (resolveCallback) {
      // Storing resolve callback function
      onResolve = resolveCallback;
  
      // Check if the promise has not yet resolved/rejected and executor isFulfilled
      if (!isCalled && isFulfilled) {
        // Mark the promise as resolved
        isCalled = true;
        onResolve(output);
      }
      // Returning this to enable chaining of then
      return this;
    }
  
    // Catch function for handling errors in promise execution
    this.catch = function (rejectCallback) {
      // Storing reject callback function
      onReject = rejectCallback;
  
      // Check if the promise has not yet resolved/rejected and executor isRejected
      if (!isCalled && isRejected) {
        // Mark the promise as rejected
        isCalled = true;
        onReject(err);
      }
      // Returning this to enable chaining of catch
      return this;
    }
  
    // Resolver function
    function resolver(data) {
      // Mark the isFulfilled flag as true since the executor work isFulfilled 
      // and store result in output
      isFulfilled = true;
      output = data;
  
      // Calling the resolve function with data
      if (typeof onResolve === 'function' && !isCalled) {
        isCalled = true;
        onResolve(data);
      }
    }
  
    // Rejecter function
    function rejecter(error) {
      // Mark the isRejected flag as true since the executor work isFulfilled 
      // and store result in output
      isRejected = true;
      err = error;
  
      // Calling the reject function with error
      if (typeof onReject === 'function' && !isCalled) {
        isCalled = true;
        onReject(error);
      }
    }
  
    // Calling the executor function with resolver and rejecter
    executor(resolver, rejecter);
  }
  
  // Test cases
  
  let p1 = new customPromise((resolve, reject) => setTimeout(() => resolve('Resolved successfully'), 1000));
  p1.then((data) => console.log(data));
  // Output - Resolved successfully
  
  let p2 = new customPromise((resolve, reject) => resolve('Resolved right away'));
  p2.then((data) => console.log(data));
  // Output - Resolved right away
  
  customPromise.resolve = function (promise) {
    return new customPromise((resolve, reject) => resolve(promise));
  }
  
  customPromise.reject = function (promise) {
    return new customPromise((resolve, reject) => reject(promise));
  }
  
  // All method which is a function that takes array of promises
  customPromise.all = function (promises) {
    // Empty array to store results of promise executions
    let output = [];
  
    // Return a new promise that resolves/rejects for the list of promises
    return new customPromise((resolve, reject) => {
  
      // Loop through all promises
      promises.forEach((promise, index) => {
  
        // Resolve each promise
        customPromise.resolve(promise).then((data) => {
          // Store the result of promise at the index
          output[index] = data;
  
          // Resolve this promise when all promises are resolved with output array
          if (index === promises.length - 1) resolve(output);
          // Reject the promise as soon as any promise fails
        }).catch(reject);
      })
    });
  }
  
  // Any method which is a function that takes array of promises
  customPromise.any = function (promises) {
    // Empty array to store errors in promise executions
    let errors = [];
  
    // Return a new promise that resolves/rejects for the list of promises
    return new customPromise((resolve, reject) => {
  
      // Loop through all promises
      promises.forEach((promise, index) => {
  
        // Resolve each promise
        customPromise.resolve(promise)
          // Resolve the promise as soon as any promise resolves
          .then(resolve).catch((error) => {
            // Store the error of promise at the index
            errors[index] = error;
  
            // Reject this promise when all promises are rejected with the errors array
            if (index === promises.length - 1) reject(errors);
          });
      })
    });
  }
  
  // Race method which is a function that takes array of promises
  customPromise.race = function (promises) {
    // Return a new promise that resolves/rejects 
    // as soon as any one of the provided promises resolves/rejects
    return new customPromise((resolve, reject) => {
  
      // Loop through all promises
      promises.forEach((promise) => {
  
        // Resolve each promise
        customPromise.resolve(promise)
          // Resolve/Reject the promise as soon as any promise resolves/rejects
          .then(resolve).catch(reject);
      })
    });
  }
  
  // All Settled method which is a function that takes array of promises
  customPromise.allSettled = function (promises) {
    // Empty array to store results of promise executions
    let output = [];
  
    // Return a new promise that resolves for the list of promises
    return new customPromise((resolve) => {
  
      // Loop through all promises
      promises.forEach((promise, index) => {
  
        // Resolve each promise
        customPromise.resolve(promise).then((data) => {
          // Store the result of promise at the index with status fulfilled
          output[index] = {
            status: 'fulfilled',
            value: data
          };
  
        }).catch((err) => {
          // Store the result of promise at the index with status rejected
          output[index] = {
            status: 'rejected',
            reason: err
          };
        });
  
        // Resolve this promise when execution for all promises is completed
        if (index === promises.length - 1) resolve(output);
      })
    });
  }
  
  // Replace customPromise with Promise and all with customAll, rest is same
  Promise.customAll = function (promises) {
    let output = [];
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then((data) => {
          output[index] = data;
          if (index === promises.length - 1) resolve(output);
        }).catch(reject);
      });
    });
  }
  
  // Tests
  function runTests() {
    function logResult(testName, result) {
      console.log(`${testName}: ${result ? 'PASSED' : 'FAILED'}`);
    }
  
    // Test customPromise resolve and then
    let p1 = new customPromise((resolve, reject) => setTimeout(() => resolve('Resolved successfully'), 1000));
    p1.then((data) => {
      logResult('Test 1 - Resolve after timeout', data === 'Resolved successfully');
    });
  
    // Test customPromise resolve immediately
    let p2 = new customPromise((resolve, reject) => resolve('Resolved right away'));
    p2.then((data) => {
      logResult('Test 2 - Resolve immediately', data === 'Resolved right away');
    });
  
    // Test customPromise reject and catch
    let p3 = new customPromise((resolve, reject) => setTimeout(() => reject('Rejected'), 1000));
    p3.catch((err) => {
      logResult('Test 3 - Reject after timeout', err === 'Rejected');
    });
  
    // Test customPromise reject immediately
    let p4 = new customPromise((resolve, reject) => reject('Rejected right away'));
    p4.catch((err) => {
      logResult('Test 4 - Reject immediately', err === 'Rejected right away');
    });
  
    // Test chaining of then
    let p5 = new customPromise((resolve, reject) => resolve(1))
      .then(data => data + 1)
      .then(data => data + 1)
      .then(data => {
        logResult('Test 5 - Chaining then', data === 3);
      });
  
    // Test chaining with reject
    /*
    let p6 = new customPromise((resolve, reject) => resolve(1))
      .then(data => { throw new Error('Fail') })
      .catch(err => err.message)
      .then(data => {
        logResult('Test 6 - Chaining then and catch', data === 'Fail');
      });
    */
   
    // Test customPromise.resolve
    let p7 = customPromise.resolve('Static resolve');
    p7.then((data) => {
      logResult('Test 7 - customPromise.resolve', data === 'Static resolve');
    });
  
    // Test customPromise.reject
    let p8 = customPromise.reject('Static reject');
    p8.catch((err) => {
      logResult('Test 8 - customPromise.reject', err === 'Static reject');
    });
  
    // Test customPromise.all
    let p9 = customPromise.all([
      customPromise.resolve(1),
      customPromise.resolve(2),
      customPromise.resolve(3)
    ]);
    p9.then((data) => {
      logResult('Test 9 - customPromise.all', JSON.stringify(data) === JSON.stringify([1, 2, 3]));
    });
  
    // Test customPromise.any
    let p10 = customPromise.any([
      customPromise.reject('Error 1'),
      customPromise.resolve('First success'),
      customPromise.reject('Error 2')
    ]);
    p10.then((data) => {
      logResult('Test 10 - customPromise.any', data === 'First success');
    });
  
    // Test customPromise.race
    let p11 = customPromise.race([
      new customPromise((resolve) => setTimeout(() => resolve('First'), 100)),
      new customPromise((resolve) => setTimeout(() => resolve('Second'), 200))
    ]);
    p11.then((data) => {
      logResult('Test 11 - customPromise.race', data === 'First');
    });
  
    // Test customPromise.allSettled
    let p12 = customPromise.allSettled([
      customPromise.resolve('Success'),
      customPromise.reject('Fail')
    ]);
    p12.then((results) => {
      const expectedResults = [
        { status: 'fulfilled', value: 'Success' },
        { status: 'rejected', reason: 'Fail' }
      ];
      logResult('Test 12 - customPromise.allSettled', JSON.stringify(results) === JSON.stringify(expectedResults));
    });
  
    // Test custom Promise.customAll
    let p13 = Promise.customAll([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ]);
    p13.then((data) => {
      logResult('Test 13 - Promise.customAll', JSON.stringify(data) === JSON.stringify([1, 2, 3]));
    });
  
    // Ensure all tests run before ending the script
    setTimeout(() => console.log('All tests completed.'), 2000);
  }
  
  runTests();
  