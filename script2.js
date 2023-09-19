var clutter = "";
var clutter2 = "";
var result = ""; 

function encryption(){
    document.querySelector("#encrypt-btn").addEventListener("click", function(){

    // getting Input
        var input = document.getElementById("textmsg").value;
        console.log(input);

    // Getting password
        var password = document.getElementById("password").value;
        console.log(password);

    // Splitting the input
        const str = input.split("");
        console.log(str);
        
    // Converting in emojies
        str.forEach(element =>{
            clutter += `&#128${(element.charCodeAt())} `;
        });
        console.log(clutter);

    // Storing in #result in div
        document.querySelector("#result").innerHTML = clutter;

        var dataarr = [];
        if(JSON.parse(localStorage.getItem('data1'))){
            dataarr = JSON.parse(localStorage.getItem('data1'));
            console.log(dataarr)
            dataarr.push({"pass":password, "input":input, "clutter":clutter})
        }
        else{
            dataarr = [{"pass":password,"input":input,"clutter":clutter}]
        }
        localStorage.setItem(`data1`, JSON.stringify(dataarr))
    });
    
}

encryption();

  
function decryption() {
    document.querySelector("#decrypt-btn").addEventListener("click", function () {
       
        var input2 = document.querySelector("#emojimsg").value;
        var finalPass = document.querySelector("#finalpassword").value;
        var user = JSON.parse(localStorage.getItem('data1'))
        console.log(user)
        var str2 = input2.split(" ")
        str2.forEach(element => {
                clutter2 += `&#${(element.codePointAt(0))} `
                // console.log((element.charCodeAt()) * Math.floor(Math.random() * 10))
        });
        console.log(clutter2)
        var found;
        for(let i of user){
            if(i.clutter == clutter2 && i.pass == finalPass){
                found = i;
                console.log(i)
            }
        }
        if (found.clutter === clutter2 && found.pass===finalPass) {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `#eee`
            document.querySelector("#result").innerHTML = found.input
            
        } else if(found.clutter != clutter2 || found.pass!=finalPass) {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `rgb(53, 0, 0)`
            document.querySelector("#result").style.backgroundColor = `rgba(252, 154, 154, 0.74)`
            document.querySelector("#result").innerHTML = "Wrong password!"
        }
    })

}

decryption();


function btnClicking(){
    document.querySelector("#dec-btn").addEventListener("click", function(){
        
        document.querySelector("#decryption").style.display="block"
        document.querySelector("#encryption").style.display = "none";
        document.querySelector("#dec-btn").style.backgroundColor = "#333";
        document.querySelector("#enc-btn").style.backgroundColor = "#222";
        document.querySelector("#main>h1 span i").style.rotate = "180deg";
        document.querySelector("#result").style.display = 'none';
        document.getElementById("emojimsg").value = "";
        document.getElementById("finalpassword").value = "";
    });  

    document.querySelector("#enc-btn").addEventListener("click", function(){
        location.reload();
        document.querySelector("#encryption").style.display="block"
        document.querySelector("#decryption").style.display = "none";
        document.querySelector("#dec-btn").style.backgroundColor = "#222";
        document.querySelector("#enc-btn").style.backgroundColor = "#333";
        document.querySelector("#main>h1 span i").style.rotate = "0deg";
        document.querySelector("#result").style.display = 'none';
        document.getElementById("textmsg").value = ""
        document.getElementById("password").value = "";
    });  
    
    document.querySelector("button").addEventListener("click", function(){
        document.querySelector("#result").style.display = 'block';
    });

    // document.querySelector("#decrypt-btn").addEventListener("click", function(){
    //     document.querySelector("#result").style.display = 'block';
    // })
}

btnClicking();

 



