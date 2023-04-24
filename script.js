const img = new Image();
img.src = "res/thomYorke.jpg";


img.addEventListener("load",()=>{
    const canvas = document.getElementById("canvas");
    const c = canvas.getContext("2d");
    c.drawImage(img,0,0,canvas.width,canvas.height);
    canvas.width = 800;
    canvas.height = 800;
    
    let particlesArray = [];
    let partNum = 5000;

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
        }

        update(){
            this.y += this.velocity;
            if(this.y >= canvas.height){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw(){
            c.beginPath();
            c.fillStyle = "white";
            c.arc(this.x,this.y,this.size,0,Math.PI * 2);
            c.fill();
        }
    }
    function init(){
        for(let i = 0; i < partNum; i++){
            particlesArray.push(new Particle);
        }
    }
    init();
    function animate(){
        c.globalAlpha = 0.05;
        c.fillStyle = "rgb(0,0,0)";
        c.fillRect(0,0,canvas.width,canvas.height);
        for(let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();

        }
        requestAnimationFrame(animate);
    }
    animate();
});