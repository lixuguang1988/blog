function merge(root){
    for(var i = 1; i < arguments.length; i++){
        for(var prop in arguments[i]){
            root[prop] = arguments[i][prop];
        }
    }
    return root;
}

//merge({"name": "lixuguang"}, {"name" : "guanniu", "age" : 27});
