const fs = require("fs");




let a = []
for(let i = 0; i < 100;i++){
     obj = {
        long_description: {
            content:`<h1>caseStudie${i}</h1><h3>vraag1_${i}</h3><p>dit is een fake test want we hbben nog geen volledige tesk dus daarom schrijgf uk nu deze bullshitzodat we toch nog wat tekst hgebben om te kunnen testen of he wekrt </p><h3>vraag2_${i}</h3><p>dit is een fake test want we hbben nog geen volledige tesk dus daarom schrijgf uk nu deze bullshitzodat we toch nog wat tekst hgebben om te kunnen testen of he wekrt </p><h3>vraag3_${i}</h3><p>dit is een fake test want we hbben nog geen volledige tesk dus daarom schrijgf uk nu deze bullshitzodat we toch nog wat tekst hgebben om te kunnen testen of he wekrt </p> <h3>vraag1_${i}</h3><p>dit is een fake test want we hbben nog geen volledige tesk dus daarom schrijgf uk nu deze bullshitzodat we toch nog wat tekst hgebben om te kunnen testen of he wekrt </p><h3>vraag2_${i}</h3><p>dit is een fake test want we hbben nog geen volledige tesk dus daarom schrijgf uk nu deze bullshitzodat we toch nog wat tekst hgebben om te kunnen testen of he wekrt </p><h3>vraag3_${i}</h3><p>dit is een fake test want we hbben nog geen volledige tesk dus daarom schrijgf uk nu deze bullshitzodat we toch nog wat tekst hgebben om te kunnen testen of he wekrt </p>`
        }
    }
a.push(obj)
}

fs.writeFile('content.json',JSON.stringify(a),()=>{})