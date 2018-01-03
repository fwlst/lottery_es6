{
    let arr = Array.of(1, 2, 3, 4, 5, 6);
    console.log('arr:', arr);


    let arr1 = Array.of();
    console.log('arr1:', arr1);
}


{
    let p = document.querySelectorAll('p');
    //console.log('p:',p,p.length);
    let pArr = Array.from(p);
    pArr.forEach((arr, index) => {
        console.log(arr.textContent, index)
    });



    console.log('第二个参数(只能是function)相当于map功能:',Array.from([1,2,3,4,5],(item)=>{
        return item*10;
    }))
}


{
    console.log('数组的全量替换:',[1,'2',undefined,NaN].fill('7').fill(7));
    console.log('数组的指定替换:',[1,'2',undefined,NaN,8,9,0].fill('7').fill(7,2,5))
}


{
    for (let index of ['s','f','l']){
        console.log('返回数组val:',index);
    }

    for (let index of ['s','f','l'].keys()){
        console.log('返回数组下标:',index);
    }
}

