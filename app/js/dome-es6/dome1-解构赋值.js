{
    let a, b, rest;
    [a, b] = [1, 2];
    console.log('数组解构赋值:', a, b);
}


{
    let a, b, rest;
    [a, b, ...rest] = [1, 2, 5, 6, 7];
    console.log('数组解构赋值:', a, b, rest);
}

{
    let a, b, rest;
    ({a, b} = {a: 1, b: 2});
    console.log('对象解构赋值:', a, b);
}

{
    let a, b, c, rest;
    [a, b, c] = [1, 2];
    console.log('数组解构赋值:', a, b, c);
}

{
    let a, b, c, rest;
    [a, b, c = 3] = [1, 2];
    console.log('数组解构赋值默认值:', a, b, c);
}


{
    let a = 1,
        b = 2;
    [a, b] = [b, a];
    console.log('变量交换:', a, b)
}


{
    function f() {
        return [1, 2];
    }

    let a, b;

    [a, b] = f();

    console.log('接收返回值:', a, b)

}


{
    function f() {
        return [1, 2, 3, 4, 5];
    }

    let a, b, c;

    [a, , , b] = f();

    console.log('接收返回值忽略不需要的值:', a, b)

}


{
    function f() {
        return [1, 2, 3, 4, 5];
    }

    let a, b, c;

    [a, ...b] = f();
    console.log('接收返回值不确定数组长度:', a, b)
}


{
    let o = {p: 42, q: true};
    let {p,q} = o;
    console.log('对象解构赋值',p,q)
}

{
    let {p=5,q = 10} = {p:3};
    console.log('对象解构赋值默认值',p,q)
}


{
    let data={
        title:'标题1',
        test:[{
            title:'副标题1',
            desc: '描述'
        },{
            title:'副标题2',
            desc: '描述'
        },{
            title:'副标题3',
            desc: '描述'
        }]
    }


    let {title: esTitle, test:[{title:cnTitle1},{title:cnTitle2},{title:cnTitle3}]} = data;

    console.log('对象多层解构赋值：',esTitle,cnTitle1,cnTitle2,cnTitle3);




}





