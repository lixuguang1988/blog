function assert(value, desc){
    var results = document.getElementById("results"),
        li = document.createElement("li");

    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
}
