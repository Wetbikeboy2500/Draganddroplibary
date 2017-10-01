let mx, my;
document.addEventListener('DOMContentLoaded', () => {
    console.log("loading");
    let dom = document.getElementsByClassName("draggable");
    for (let i = 0; i < dom.length; i++) {
        new dom_object(dom.item(i), 0);
    }
}, false);
document.addEventListener("mousemove", (event) => {
    mx = event.pageX;
    my = event.pageY;
}, false);
class dom_object {
    constructor (dom, index) {
        this.dom = dom;//this will refer to the object
        this.index = index;//this will be its position in the array
        this.x = 0;
		this.y = 0;
        this.dom.addEventListener("mousedown", () => {
            this.move();
        }, false);
        document.addEventListener("mouseup", () => {
            this.stop();
        }, false);
    }
    
    setup () {
        this.sy = my;
        this.sx = mx;
    }

    update () {
        this.y += (my - this.sy);
        this.x += (mx - this.sx);
        this.render();
    }
    
    render () {
        console.log(this.y);
        this.dom.style.position = "absolute";
        this.dom.style.top = this.y + "px";
        this.dom.style.left = this.x + "px";
    }
    
    move () {
        this.setup();
		this.x = this.dom.getBoundingClientRect().left;
        this.y = this.dom.getBoundingClientRect().top;
        clearInterval(this.clock);
        this.clock = setInterval ( () => {
            this.update();
            this.setup();
        });
    }

    stop () {
        clearInterval(this.clock);
    }
    
    del () {
        this.dom.style.pointerEvents = "none";
        this.dom.parentNode.removeChild(this.dom);
    }
}