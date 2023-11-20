

let t=0

setInterval(()=>{
    t += 1
    console.log("is this working")
}, 1000)

setInterval(() => {
    const inp = document.getElementById('test')
    inp.value = t
    console.log("????Working", inp)
}, 2000);


