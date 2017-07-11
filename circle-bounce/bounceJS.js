(function(){

    function init() {
        var screenWidth  = window.innerWidth - 100;
        var screenHeight = window.innerHeight - 100;

        var div = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(div);

        // Create the canvas tag <canvas width="" height=""></canvas>
        var x = document.createElement('canvas');
        x.setAttribute("width",  screenWidth + "");
        x.setAttribute("height", screenHeight + "");

        document.getElementsByTagName('body')[0].appendChild(x);

        // Create the JS canvas
        var canvas = document.getElementsByTagName('canvas')[0];
        var c = canvas.getContext('2d');

        // Creates the container
        var container = {x:0, y:0, width:screenWidth, height:screenHeight};

        var numberOfCircles = 100;
        var circles = createCircles(numberOfCircles);

        var a_sq, b_sq, distance;
        var newVelX1, newVelY1, newVelX2, newVelY2;

        // Draws the circles
        function draw(){
            c.fillStyle = 'black';
            c.strokeStyle = 'black';
            c.fillRect(container.x,container.y,container.width,container.height);
            c.clearRect(container.x,container.y,container.width,container.height);
            c.strokeRect(container.x,container.y,container.width,container.height);

            for(var i = 0; i < circles.length; i++){
                c.fillStyle = 'hsl(' + circles[i].color + ',100%, 50%)';
                c.beginPath();
                c.arc(circles[i].x,circles[i].y,circles[i].r, 0, 2*Math.PI,true);
                c.fill();

                if((circles[i].x + circles[i].vx + circles[i].r > container.width) || (circles[i].x - circles[i].r + circles[i].vx < container.x)){
                    circles[i].vx = -circles[i].vx;
                }

                if((circles[i].y + circles[i].vy + circles[i].r > container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)){
                    circles[i].vy = -circles[i].vy;
                }

                circles[i].x += circles[i].vx;
                circles[i].y += circles[i].vy;

                for (var j = 0; j < circles.length; j++) {
                    if (i == j) {
                        continue;
                    }

                    a_sq = circles[i].x - circles[j].x;
                    b_sq = circles[i].y - circles[j].y;
                    distance = Math.sqrt((a_sq * a_sq) + (b_sq * b_sq));

                    if (distance < circles[j].r + circles[i].r) {

                        newVelX1 = (circles[i].vx * (circles[i].mass - circles[j].mass) + (2 * circles[j].mass * circles[j].vx)) / (circles[i].mass + circles[j].mass);
                        newVelY1 = (circles[i].vy * (circles[i].mass - circles[j].mass) + (2 * circles[j].mass * circles[j].vy)) / (circles[i].mass + circles[j].mass);
                        newVelX2 = (circles[j].vx * (circles[j].mass - circles[i].mass) + (2 * circles[i].mass * circles[i].vx)) / (circles[i].mass + circles[j].mass);
                        newVelY2 = (circles[j].vy * (circles[j].mass - circles[i].mass) + (2 * circles[i].mass * circles[i].vy)) / (circles[i].mass + circles[j].mass);

                        circles[i].vx = newVelX1;
                        circles[i].vy = newVelY1;
                        circles[j].vx = newVelX2;
                        circles[j].vy = newVelY2;

                    }
                }
            }

            requestAnimationFrame(draw);
        }

        /**
         * Creates circles
         *
         * @param numOfCircles
         * @returns {Array}
         */
        function createCircles(numOfCircles) {
            var circles = [];
            var maxRadius = 100;
            var minRadius = 25;

            var xStartingPointMin;
            var xStartingPointMax;
            var xStartingPoint;

            var yStartingPointMin;
            var yStartingPointMax;
            var yStartingPoint;

            var circleRadius;
            var circleColor;

            var vxStarting;
            var vyStarting;

            var circleMass;

            for (var i = 0; i < numOfCircles; i++) {
                circleRadius      = Math.floor((Math.random() * maxRadius) + minRadius);
                circleMass        = circleRadius;
                circleColor       = Math.floor((Math.random() * 200) + 1);

                xStartingPointMin = 150;
                xStartingPointMax = screenWidth - (circleRadius * 2) - 150;
                xStartingPoint    = Math.floor((Math.random() * xStartingPointMax) + xStartingPointMin);

                yStartingPointMin = 150;
                yStartingPointMax = screenHeight - (circleRadius * 2) - 150;
                yStartingPoint    = Math.floor((Math.random() * yStartingPointMax) + yStartingPointMin);

                vxStarting        = Math.floor((Math.random() * 5) - 2);
                vyStarting        = Math.floor((Math.random() * 5) - 2);

                circles[i] = {x:xStartingPoint, y:yStartingPoint, r:10, color:circleColor, vx:vxStarting, vy:vyStarting, mass:circleRadius};
            }

            return circles;
        }

        requestAnimationFrame(draw);

    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);

}());  //self invoking function