function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  console.log('after');
  // expected output: 'resolved'
}

//asyncCall();

// ---------------------------------------

async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  console.log(result); // "done!"
}

//f();

// Example: Take out async!

// ---------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hey(){
  console.log('Hey was called...');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Hey!');
      resolve('Hey!');
    }, 1000);
  });
}

function how(){
  console.log('How was called...');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('How!');
      resolve('How!');
    }, 2000);
  });
}

function are(){
  console.log('Are was called...');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Are!');
      resolve('Are!');
    }, 3000);
  });
}

function you(){
  console.log('You was called...');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('You!');
      resolve('You!');
    }, 4000);
  });
}

async function asking() {
  await hey();
  await how();
  await are();
  await you();

  //console.log(h0 + h1 + h2 + h3);
}

//asking();

async function askingAll(){
  const [h0, h1, h2, h3] = await Promise.all([hey(), how(), are(), you()]);

  //console.log(h0 + h1 + h2 + h3);
}

//askingAll();

async function BusyAsk() {
  let timer = 0;

  while(true){
    if(timer % 10000 == 0){
      console.log('----------------------------')
      hey();
      how();
      are();
      you();
      console.log('----------------------------')
    }
    console.log("Inside main loop... Time passed (ms): "+timer);
    await sleep(500);
    timer += 500;
  }

  //console.log(h0 + h1 + h2 + h3);
}

BusyAsk();

// ---------------------------------------