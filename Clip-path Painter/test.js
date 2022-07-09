const app=new Vue({
    el:"#app",
    data () {
        return {
            info:"made by bluem",
            sizex:700,
            sizey:700,
            imgsizex:700,
            imgx:0,
            imgy:0,
            chosen:0,
            pointx:[50],
            pointy:[50],
            chosenx:50,
            choseny:50,
            pointsum:1,
            imgurl:'picture/鸵鸟.jpeg',
            points:"",
            points_move:true,
            points_show:true,
            img_show:true,
            clip_show:true,
        }
    },
    mounted () {
        this.points="<div class='point' id='p0'>0"+
            "<div class='block' onclick='chose_point(0)'></div></div>";
        document.getElementById("points").innerHTML=this.points;
        document.getElementById("p0").style.left=this.pointx[this.chosen]+"%";
        document.getElementById("p0").style.top=this.pointy[this.chosen]+"%";
    },
    methods: {
        point_show:function(){
            this.points_show=!this.points_show;
        },
        show_clip:function(){
            this.clip_show=!this.clip_show;
        },
        img_move:function(event){
            var mousex=event.clientX;
            var mousey=event.clientY;
            var dx=0,dy=0;
            onmousemove=function(event){
                dx=(event.clientX-mousex);
                dy=(event.clientY-mousey);
                app.imgx+=dx;
                app.imgy+=dy;
                mousex=event.clientX;
                mousey=event.clientY;
            }
            onmouseup=function(){
                this.onmousemove=null;
                this.onmouseup=null;
            }
        },
        point_move:function(event){
            var mousex=event.clientX;
            var mousey=event.clientY;
            var dx=0,dy=0;
            onmousemove=function(event){
                dx=(event.clientX-mousex);
                dy=(event.clientY-mousey);
                app.chosenx+=(dx)*100/app.sizex;
                app.choseny+=(dy)*100/app.sizey;
                mousex=event.clientX;
                mousey=event.clientY;
                this.document.documentElement.style.setProperty("--text","polygon("+get_text())+")";
            }
            onmouseup=function(){
                this.onmousemove=null;
                this.onmouseup=null;
            }
        },
        movepoint:function(){
            this.points_move=true;
        },
        moveimg:function(){
            this.points_move=false;
        },
        show_img:function(){
            this.img_show=!this.img_show;
        },
        replace_img:function(){
            this.imgsizex=700;
            this.imgx=0;
            this.imgy=0;
        },
        add_point:function(){
            this.points+=("<div class='point' id='p"+this.pointsum+"'>"+this.pointsum+
                "<div class='block' onclick='chose_point("+this.pointsum+")'></div></div>");
            document.getElementById("points").innerHTML=this.points;
            this.pointx[this.pointsum]=this.chosenx;
            this.pointy[this.pointsum]=this.choseny;
            this.chosen=this.pointsum;
            this.chosenx=this.pointx[this.chosen];
            this.choseny=this.pointy[this.chosen];
            for(let i=0;i<=this.pointsum;i+=1){
                let p=document.getElementById("p"+i);
                p.style.left=this.pointx[i]+"%";
                p.style.top=this.pointy[i]+"%";
            }
            this.pointsum+=1;
        },
        delete_point:function(){
            if(this.pointsum>1){
                
                this.points="";
                for(var i=0;i<this.pointsum-1;i+=1){
                    this.points+=("<div class='point' id='p"+i+"'>"+i+
                    "<div class='block' onclick='chose_point("+i+")'></div></div>");
                }
                document.getElementById("points").innerHTML=this.points;
                for(var i=this.chosen;i<this.pointsum-1;i+=1){
                    this.pointx[i]=this.pointx[i+1];
                    this.pointy[i]=this.pointy[i+1];
                }
                this.chosen=this.pointsum-2;
                this.chosenx=this.pointx[this.chosen];
                this.choseny=this.pointy[this.chosen];
                this.pointsum-=1;
                for(let i=0;i<this.pointsum;i+=1){
                    let p=document.getElementById("p"+i);
                    console.log(i);
                    p.style.left=this.pointx[i]+"%";
                    p.style.top=this.pointy[i]+"%";
                }
                window.document.documentElement.style.setProperty("--text","polygon("+get_text())+")";

            }



        },
        show_text:function(){
            this.info=get_text();
        },
        clear_points:function(){
            this.chosen=0;
            this.pointx=[50];
            this.pointy=[50];
            this.chosenx=50;
            this.choseny=50;
            this.pointsum=1;
            this.points="<div class='point' id='p0'>0"+
                "<div class='block' onclick='chose_point(0)'></div></div>";
            document.getElementById("points").innerHTML=this.points;
            document.getElementById("p0").style.left=this.pointx[this.chosen]+"%";
            document.getElementById("p0").style.top=this.pointy[this.chosen]+"%";
        }        
    },
    watch: {
        pointx:function(){
        },
        chosenx:function(){
            this.pointx[this.chosen]=this.chosenx;
            document.getElementById("p"+this.chosen).style.left=this.pointx[this.chosen]+"%";
            window.document.documentElement.style.setProperty("--text","polygon("+get_text())+")";
        },
        choseny:function(){
            this.pointy[this.chosen]=this.choseny;
            document.getElementById("p"+this.chosen).style.top=this.pointy[this.chosen]+"%";
            window.document.documentElement.style.setProperty("--text","polygon("+get_text())+")";
        },
        chosen:function(){
            chosenx=this.pointx[this.chosen];
            choseny=this.pointy[this.chosen];
        }
    }
})

function chose_point(p){
    app.chosen=p;
    app.chosenx=app.pointx[app.chosen];
    app.choseny=app.pointy[app.chosen];
    console.log(p);
}
function pointx0(){
    app.chosenx-=10;
}
function pointx1(){
    app.chosenx+=10;    
}
function pointy0(){
    app.choseny-=10;
}
function pointy1(){
    app.choseny+=10;
}
function get_text(){
    let s="";
    for(var i=0;i<app.pointsum;i+=1){
        s+=(app.pointx[i].toFixed()+"% "+app.pointy[i].toFixed()+"%, ");
    }
    s=s.substring(0,s.length-2);
    return s;
}
function get_file(file){
    var reader=new FileReader();
    reader.onload=function(event){
        app.imgurl=event.target.result;
    }
    reader.readAsDataURL(file.files[0]);
}
