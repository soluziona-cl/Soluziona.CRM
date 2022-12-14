// function OnReady(callback) {
//     let intervalId = window.setInterval(function() {
//       if (document.getElementsByTagName('body')[0] !== undefined) {
//         window.clearInterval(intervalId);
//         callback.call(this);
//       }
//     },0);
//   }
  
//   function setVisible(selector, visible) {
//     document.querySelector(selector).style.display = visible ? 'block' : 'none';
//   }
  
//   OnReady(function() {
//     setVisible('.page', true);
//     setVisible('#loading', false);
//   });

//   export default OnReady