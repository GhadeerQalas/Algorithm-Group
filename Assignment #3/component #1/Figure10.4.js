// graph {Figure 10.4 (Levitin, 3rd edition)}

var _v = [
    { label: "1" },	
    { label: "2" },	
    { label: "3" },	
    { label: "4" },	
    { label: "5" },	
    { label: "6" },	
    ];
    
//We have 7 edges and 6 verticese
    var _e = [
    // 1(0) >> 2(1)
    { u: 0, v: 1, w: 2 },

    // 1(0) >> 4(3)
    { u: 0, v: 3, w: 3 },

    // 2(1) >> 5(4)
    { u: 1, v: 4, w: 3 },
    
    // 2(1) >> 3(2)
    { u: 1, v: 2, w: 5 },

    // 3(2) >> 6(5)
    { u: 2, v: 5, w: 2 },
    
    // 4(3) >> 3(2)
    { u: 3, v: 2, w: 1 },
    
    // 5(4) >> 6(5)
    { u: 4, v: 5, w: 4 },
    
    ];