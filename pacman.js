   var pos = 0;
    var max = 250;
    const pacArray = [
        ['PacMan1.png', 'PacMan2.png'],
        ['PacMan3.png', 'PacMan4.png']
    ];
    const pacMen = []; // This array holds all the pacmen
    var running = 0;
    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        let direction = 0;
        let focus = 0;
        let count = 0;
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = 'PacMan1.png';
       
        newimg.width = 100;
        newimg.style.left = position.x;
        newimg.style.top = position.y;
      

        game.appendChild(newimg);
          return {
            position,
            velocity,
            newimg,
            focus,
            direction,
            count
        }
    }

  
    function update() {
        //running=(running+1)%2;
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item);
           // direction = (velocity<0);
            item.newimg.src = pacArray[item.direction][item.focus];
            if (item.count == 20)
            {
                item.focus = (item.focus + 1) % 2;
                item.count = 0;
            } else {
                item.count++
            };

            if (item.velocity.x >0) {item.direction = 0;} else {item.direction = 1;};
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;
            

        })
        if(running==1){
            setTimeout(update, 20);
        }
    }
    function checkCollisions(item) {
        // bounce right and left
       if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
       item.position.x + item.velocity.x < 0){
            item.velocity.x = -item.velocity.x;
       }
       if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
       item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
      
    }

    function makeOne() {
        temp=makePac()
        pacMen.push(temp); // add a new PacMan
    }

    function make(){
        for(let i=0; i<1; i++){
            if(pacMen.length < max){
                makeOne();
            }
            sleep(1000).then(() => {make();});
        
        }
    }


    function toggleAndUpdate(){
        running=(running+1)%2;
        update();
    }

    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
