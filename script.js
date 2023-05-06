const img = new Image();
img.src = "res/2.png";


img.addEventListener("load",()=>{
    const canvas = document.getElementById("canvas");
    const c = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 800;
    
    c.drawImage(img,0,0,canvas.width,canvas.height);
    const pixels = c.getImageData(0,0,canvas.width,canvas.height);
    c.clearRect(0,0,canvas.width,canvas.height);
    
    let particlesArray = [];
    let partNum = 5000;


    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++){
        let row = [];
        for (let x = 0; x < canvas.width; x++){
            const red = pixels.data[(y*4*pixels.width)+(x*4)]
            const green = pixels.data[(y*4*pixels.width)+(x*4+1)]
            const blue = pixels.data[(y*4*pixels.width)+(x*4+2)]
            const brightness = calculateRelativeBrightness(red,green,blue);
            const cell = [
                cellBrightness = brightness,
            ];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    function calculateRelativeBrightness(r,g,b){
        return Math.sqrt(
            (r*r)*0.299 +
            (g*g)*0.587 +
            (b*b)*0.114
        )/100;
    }
    
    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.pos1 = Math.floor(this.y);
            this.pos2 = Math.floor(this.x);
        }

        update(){
            this.pos1 = Math.floor(this.y);
            this.pos2 = Math.floor(this.x);
            this.speed = mappedImage[this.pos1][this.pos2][0];
            let movement = (2.5-this.speed)+this.velocity;

            this.y += movement;
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
        //c.drawImage(img,0,0,canvas.width,canvas.height);
        c.globalAlpha = 0.05;
        c.fillStyle = "rgb(0,0,0)";
        c.fillRect(0,0,canvas.width,canvas.height);
        c.globalAlpha = 0.2;
        for(let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            c.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();

        }
        requestAnimationFrame(animate);
    }
    animate();
});