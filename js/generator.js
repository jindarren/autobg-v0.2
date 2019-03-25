
function csv2array(data, delimeter) {
    // Retrieve the delimeter
    if (delimeter == undefined)
        delimeter = ',';
    if (delimeter && delimeter.length > 1)
        delimeter = ',';

    // initialize variables
    var newline = '\n';
    var eof = '';
    var i = 0;
    var c = data.charAt(i);
    var row = 0;
    var col = 0;
    var array = new Array();

    while (c != eof) {
        // skip whitespaces
        while (c == ' ' || c == '\t' || c == '\r') {
            c = data.charAt(++i); // read next char
        }

        // get value
        var value = "";
        if (c == '\"') {
            // value enclosed by double-quotes
            c = data.charAt(++i);

            do {
                if (c != '\"') {
                    // read a regular character and go to the next character
                    value += c;
                    c = data.charAt(++i);
                }

                if (c == '\"') {
                    // check for escaped double-quote
                    var cnext = data.charAt(i+1);
                    if (cnext == '\"') {
                        // this is an escaped double-quote.
                        // Add a double-quote to the value, and move two characters ahead.
                        value += '\"';
                        i += 2;
                        c = data.charAt(i);
                    }
                }
            }
            while (c != eof && c != '\"');

            if (c == eof) {
                throw "Unexpected end of data, double-quote expected";
            }

            c = data.charAt(++i);
        }
        else {
            // value without quotes
            while (c != eof && c != delimeter && c!= newline && c != ' ' && c != '\t' && c != '\r') {
                value += c;
                c = data.charAt(++i);
            }
        }

        // add the value to the array
        if (array.length <= row)
            array.push(new Array());
        array[row].push(value);

        // skip whitespaces
        while (c == ' ' || c == '\t' || c == '\r') {
            c = data.charAt(++i);
        }

        // go to the next row or column
        if (c == delimeter) {
            // to the next column
            col++;
        }
        else if (c == newline) {
            // to the next row
            col = 0;
            row++;
        }
        else if (c != eof) {
            // unexpected character
            throw "Delimiter expected after character " + i;
        }

        // go to the next character
        c = data.charAt(++i);
    }

    return array;
}


function createRGBfromHSV(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}


function getNumberInNormalDistribution(std_dev){
    var offset = randomNormalDistribution()*std_dev;
    return offset;
}

function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    c=Math.sqrt((-2*Math.log(w))/w);
    return u*c;
}

function rgb2hsv (r,g,b) {
	var computedH = 0;
	var computedS = 0;
	var computedV = 0;

	//remove spaces from input RGB values, convert to int
	var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
	var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
	var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

	if ( r==null || g==null || b==null ||
	 isNaN(r) || isNaN(g)|| isNaN(b) ) {
	alert ('Please enter numeric RGB values!');
	return;
	}
	if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
	alert ('RGB values must be in the range 0 to 255.');
	return;
	}
	r=r/255; g=g/255; b=b/255;
	var minRGB = Math.min(r,Math.min(g,b));
	var maxRGB = Math.max(r,Math.max(g,b));

	// Black-gray-white
	if (minRGB==maxRGB) {
	computedV = minRGB;
	return [0,0,computedV];
	}

	// Colors other than black-gray-white:
	var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
	var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
	computedH = 60*(h - d/(maxRGB - minRGB));
	computedS = (maxRGB - minRGB)/maxRGB;
	computedV = maxRGB;
	return [computedH,computedS,computedV];
}

function generateColor(colors, number,std_dev){
	var numberOfColor = colors.length;

	var colorList = [];

	for(var n = 0; n < colors.length; n++){

		var hList=[], sList=[], vList=[];

		var k = number
	    for (k; k > 0; k--) {

	        var offset = getNumberInNormalDistribution(std_dev)

	        var new_h = colors[n][0] + offset;
	        var new_s = colors[n][1] + offset;
	        var new_v = colors[n][2] + offset;

	        if(new_h<0){
	            new_h = 360+new_h
	        }
	        else if(new_h>360){
	            new_h = new_h-360
	        }

	        if(new_s<0){
	            new_s = new_s * -1
	        }
	        else if(new_s>100){
	            new_s = 200-new_s
	        }

	        if(new_v<0){
	            new_v = new_v * -1
	        }
	        else if(new_v>100){
	            new_v = 200-new_v
	        }

	        hList.push(new_h)
	        sList.push(new_s)
	        vList.push(new_v)
	    }

	    colorList.push([hList,sList,vList])

	}

	var rgbList = []

	for (hIndex in colorList[0][0]){
        for(sIndex in colorList[0][1]){
            for(vIndex in colorList[0][2]){

        		var RGBs=[];
            	for(var n=0; n< numberOfColor; n++){
            		RGBs.push(createRGBfromHSV(colorList[n][0][hIndex]/360,colorList[n][1][sIndex]/100,colorList[n][2][vIndex]/100))
            	}
            	rgbList.push(RGBs)
            }
        }
    }

    return rgbList
}

var backgroundPalette = [], elementPalette = []; skinPalette = [{r:91,g:79,b:76},{r:223,g:186,b:170},{r:245,g:222,b:230}]

var colorRanNumber = 10, colorRanRange = 5;
backgroundPalette.push(generateColor([[0,0,100]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[0,0,92]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[0,0,21]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[164,15,72]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[248,36,58]],colorRanNumber,colorRanRange))

backgroundPalette.push(generateColor([[39,49,98],[331,60,96]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[328,33,100],[213,26,100]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[187,43,100],[325,21,100]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[171,49,91],[223,44,89]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[336,42,100],[222,93,60]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[36,32,99],[188,52,95]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[135,64,91],[259,67,96]],colorRanNumber,colorRanRange))
backgroundPalette.push(generateColor([[8,25,98],[188,51,85]],colorRanNumber,colorRanRange))

colorRanRange=8
elementPalette.push(generateColor([[0,0,100]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[0,0,84]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[77,13,21]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[252,59,100]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[154,37,94]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[339,40,100]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[47,78,98]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[296,59,99]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[187,45,91]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[347,78,100]],colorRanNumber,colorRanRange))

elementPalette.push(generateColor([[0,0,93],[0,0,47]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[51,19,100],[334,45,100]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[58,83,100],[326,80,95]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[24,49,100],[274,79,91]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[135,64,91],[62,81,96]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[135,64,91],[259,67,96]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[352,42,99],[183,75,95]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[319,86,89],[190,46,93]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[181,80,93],[259,67,96]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[207,86,89],[273,82,57]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[30,11,93],[23,44,74]],colorRanNumber,colorRanRange))
elementPalette.push(generateColor([[187,43,100],[325,21,100]],colorRanNumber,colorRanRange))


console.log("BGPalette", backgroundPalette)
console.log("ElePalette", elementPalette)

//Layout

var width=1080/4, height=1440/4;
var widthSegments = 30, heightSegments = 40;

//position for laying texts
var textIntersection = [];
textIntersection[0] = [(width/widthSegments)*2, (height/heightSegments)*2, 0]
textIntersection[1] = [(width/widthSegments)*17, (height/heightSegments)*2, 0]
textIntersection[2] = [(width/widthSegments)*2, (height/heightSegments)*32, 0]
textIntersection[3] = [(width/widthSegments)*17, (height/heightSegments)*32, 0]

	//four corners
var p0 = [0,0],
	p1 = [width,0],
	p2 = [width, height],
	p3 = [0,height],
	//root squre coor
	p4 = [0,width*width/height],
	p5 = [width, width*width/height],
	p6 = [0,height-(width*width/height)],
	p7 = [width,height-(width*width/height)],
	//three-folds
	p8 = [0,height/3],
	p9 = [0,height*2/3],
	p10 = [width,height/3],
	p11 = [width,height*2/3],
	p12 = [width/3,0],
	p13 = [width*2/3,0],
	p14 = [width/3,height],
	p15 = [width*2/3,height];

var coreIntersections = [],
	normalIntersections = [];

//center
coreIntersections[0] = [width/2, height/2, 0];
//three-folds
coreIntersections[1] = [width/3, height/3, 0];
coreIntersections[2] = [width/3, height*2/3, 0];
coreIntersections[3] = [width*2/3, height/3, 0];
coreIntersections[4] = [width*2/3, height*2/3, 0];
//squre-intersection
coreIntersections[5] = calIntersection(height/width, 0, -width/height, width*width/height);
//coreIntersections[5].push(Math.atan(-width/height)*90)
coreIntersections[5].push(0)

coreIntersections[6] = calIntersection(height/width, 0, -width/height, height)
//coreIntersections[6].push(Math.atan(-width/height)*90)
coreIntersections[6].push(0)

coreIntersections[7] = calIntersection(-height/width, height, width/height, height-(width*width/height))
//coreIntersections[7].push(Math.atan(width/height)*90)
coreIntersections[7].push(0)

coreIntersections[8] = calIntersection(-height/width, height, width/height, 0)
//coreIntersections[8].push(Math.atan(width/height)*90)
coreIntersections[8].push(0)

function calIntersection(a1, b1, a2, b2){
	var interPoint = []
	//x
	interPoint[0] = (b2-b1)/(a1-a2)
	//y
	interPoint[1] = a1*interPoint[0]+b1
	return interPoint
}


// Draw white points
var widthGap = width/widthSegments;
var heightGap = height/heightSegments;
var lineStyle_2 = {width: 0.5 ,color: '#C1BAC6'}

for (var i = 1; i < widthSegments; i++){

	var x = heightGap*i
	//draw.line(x,0,x,height).stroke(lineStyle_2)

	//calculate interaction with horizontal lines
	normalIntersections.push([x, x*height/width, Math.atan(height/width)*90])
	normalIntersections.push([x, x*(-height/width)+height,Math.atan(-height/width)*90])
	normalIntersections.push([x, x*(-width/height)+width*width/height, Math.atan(-width/height)*90])
	normalIntersections.push([x, x*(-width/height)+height, Math.atan(-width/height)*90])
	normalIntersections.push([x, x*width/height+height-(width*width/height), Math.atan(width/height)*90])
	normalIntersections.push([x, x*width/height, Math.atan(width/height)*90])
}
for(var j = 1; j< heightSegments; j++){
	var y = heightGap*j
	//draw.line(0,y,width,y).stroke(lineStyle_2)

	normalIntersections.push([y/(height/width), y, Math.atan(height/width)*90])
	normalIntersections.push([(y-height)/(-height/width), y, Math.atan(-height/width)*90])


	if(y<=width*width/height){
		normalIntersections.push([(y-width*width/height)/(-width/height), y, Math.atan(-width/height)*90])
		normalIntersections.push([y/(width/height), y, Math.atan(width/height)*90])
	}

	if(y>=height-width*width/height && y<height){
		normalIntersections.push([(y-height)/(-width/height), y, Math.atan(-width/height)*90])
		normalIntersections.push([(y-height+(width*width/height))/(width/height), y, Math.atan(width/height)*90])
	}
}

// for(index in normalIntersections){
// 	draw.circle(2).attr({cx: normalIntersections[index][0], cy: normalIntersections[index][1], fill: '#FFFFFF'})
// }

// for(index in coreIntersections){
// 	draw.circle(2).attr({cx: coreIntersections[index][0], cy: coreIntersections[index][1], fill: '#FC0107'})
// }

console.log(coreIntersections)
console.log(normalIntersections)

// //Store all parameters
// var parametersList = []
// //Store good poster index
// var goodPostersIndex = []

var div = document.createElement("div");
div.setAttribute("id", "container");

function createPoster(csvdata, index){

		var subdiv = document.createElement("div");
		subdiv.setAttribute("id", "poster"+index);
		subdiv.setAttribute("class", "poster");
		div.appendChild(subdiv)
		document.body.appendChild(div);

		var draw = SVG('poster'+index).size(width, height)

		/** define the background and different shapes **/
		var circle1 = draw.group(),
			circle2 = draw.group(),
			circle3 = draw.group(),
			circle4 = draw.group(),
			circle5 = draw.group(),
			circle6 = draw.group(),
			circle7 = draw.group(),
			circle8 = draw.group(),
			circle9 = draw.group(),
			circle10 = draw.group(),
			circle11 = draw.group(),
			circle12 = draw.group(),
			triangle1 = draw.group(),
			triangle2 = draw.group(),
			triangle3 = draw.group(),
			triangle4 = draw.group(),
			triangle5 = draw.group(),
			triangle6 = draw.group(),
			triangle7 = draw.group(),
			triangle8 = draw.group(),
			triangle9 = draw.group(),
			triangle10 = draw.group(),
			triangle11 = draw.group(),
			triangle12 = draw.group(),
			rectangle1 = draw.group(),
			rectangle2 = draw.group(),
			rectangle3 = draw.group(),
			rectangle4 = draw.group(),
			rectangle5 = draw.group(),
			rectangle6 = draw.group(),
			rectangle7 = draw.group(),
			rectangle8 = draw.group(),
			rectangle9 = draw.group(),
			rectangle10 = draw.group(),
			rectangle11 = draw.group(),
			rectangle12 = draw.group(),
			people1 = draw.group(),
			people2 = draw.group(),
			people3 = draw.group();

		circle1.attr({"id":"circle1","transform":"translate(-422.5,-370)","width":"293","height":"293"}).path('M568.325837,370.20728 C568.325837,450.861801 502.943523,516.244115 422.289002,516.244115 C341.634481,516.244115 276.252167,450.861801 276.252167,370.20728 C276.252167,289.552759 341.634481,224.170445 422.289002,224.170445 C502.943523,224.170445 568.325837,289.552759 568.325837,370.20728')
		circle2.attr({"id":"circle2","transform":"translate(-422.5,-790)","width":"293","height":"147"}).path('M568.325837,863.054337 C568.325837,782.399816 502.943523,717.017502 422.289002,717.017502 C341.634481,717.017502 276.252167,782.399816 276.252167,863.054337 L568.325837,863.054337 Z')
		circle3.attr({"id":"circle3","transform":"translate(-407.5,-1165)","width":"147","height":"147"}).path('M480.16275,1092.54895 C399.508229,1092.54895 334.125916,1157.93127 334.125916,1238.58579 L480.16275,1238.58579 L480.16275,1092.54895 Z')
		circle4.attr({"id":"circle4","transform":"translate(-399.5,-1562)","width":"261","height":"261"}).path('M359.450325,1438.94443 C307.393062,1455.84576 269.760992,1504.74538 269.760992,1562.43642 C269.760992,1634.12753 327.880407,1692.24694 399.571512,1692.24694 C460.546758,1692.24694 511.701839,1650.20456 525.633753,1593.52929 C528.083926,1583.56633 529.382032,1569.1671 529.382032,1538.39551 L529.382032,1432.6259 L425.533616,1432.6259 C395.245576,1432.6259 372.084134,1434.84242 359.450325,1438.94443')
		circle5.attr({"id":"circle5","transform":"translate(-850,-370)","width":"196","height":"293"}).path('M850.335946,516.244115 C796.565183,516.244115 752.978056,472.656987 752.978056,418.886225 L752.978056,321.528335 C752.978056,267.757572 796.565183,224.170445 850.335946,224.170445 C904.106708,224.170445 947.693836,267.757572 947.693836,321.528335 L947.693836,418.886225 C947.693836,472.656987 904.106708,516.244115 850.335946,516.244115')
		circle6.attr({"id":"circle6","transform":"translate(-850,-790)","width":"230","height":"146"}).path('M850.335946,863.060179 C869.336961,815.43919 912.661222,780.172917 964.965125,772.624435 C938.220913,738.766606 896.830829,717.010363 850.335946,717.010363 C803.841063,717.010363 762.450979,738.766606 735.706766,772.624435 C788.01067,780.172917 831.334931,815.43919 850.335946,863.060179')
		circle7.attr({"id":"circle7","transform":"translate(-835,-1165)","width":"126","height":"251"}).path('M897.66259,1077.18166 L897.66259,1040.62377 C828.658563,1040.62377 772.719964,1096.56237 772.719964,1165.5664 C772.719964,1234.57042 828.658563,1290.50902 897.66259,1290.50902 L897.66259,1253.95113 C848.847344,1253.95113 809.277852,1214.38164 809.277852,1165.5664 C809.277852,1116.75439 848.847344,1077.18166 897.66259,1077.18166')
		circle8.attr({"id":"circle8","transform":"translate(-842.5,-1548)","width":"163","height":"261"}).path('M777.239642,1678.18359 L761.013327,1678.18359 L761.013327,1564.59939 C761.013327,1483.94487 826.395641,1418.56256 907.050162,1418.56256 L923.276477,1418.56256 L923.276477,1532.14676 C923.276477,1612.80128 857.894163,1678.18359 777.239642,1678.18359')
		circle9.attr({"id":"circle9","transform":"translate(-1254.5,-370)","width":"267","height":"267"}).path('M1254.2933,501.29189 C1181.89798,501.29189 1123.20739,442.604554 1123.20739,370.205982 C1123.20739,297.810655 1181.89798,239.123319 1254.2933,239.123319 C1326.68863,239.123319 1385.37921,297.810655 1385.37921,370.205982 C1385.37921,442.604554 1326.68863,501.29189 1254.2933,501.29189 M1254.2933,237.150199 C1327.77904,237.150199 1387.34909,296.723492 1387.34909,370.205982 C1387.34909,443.691717 1327.77904,503.261765 1254.2933,503.261765 C1180.80757,503.261765 1121.23752,443.691717 1121.23752,370.205982 C1121.23752,296.723492 1180.80757,237.150199 1254.2933,237.150199 Z M1254.2933,441.74099 C1214.78547,441.74099 1182.75797,409.713489 1182.75797,370.205657 C1182.75797,330.701071 1214.78547,298.67357 1254.2933,298.67357 C1293.80113,298.67357 1325.82863,330.701071 1325.82863,370.205657 C1325.82863,409.713489 1293.80113,441.74099 1254.2933,441.74099 Z M1254.2933,297.599388 C1214.19159,297.599388 1181.68379,330.107188 1181.68379,370.205657 C1181.68379,410.307372 1214.19159,442.815172 1254.2933,442.815172 C1294.39502,442.815172 1326.90282,410.307372 1326.90282,370.205657 C1326.90282,330.107188 1294.39502,297.599388 1254.2933,297.599388 Z')
		circle10.attr({"id":"circle10","transform":"translate(-1250.5,-750)","width":"293","height":"293"}).path('M1103.99706,750.651631 C1103.99706,737.703032 1105.70082,725.156845 1108.86495,713.201296 L1108.86495,788.101966 C1105.70082,776.146417 1103.99706,763.600231 1103.99706,750.651631 Z M1118.35735,687.428391 C1119.86315,684.299958 1121.5085,681.255901 1123.22524,678.254033 L1123.22524,823.047932 C1121.5085,820.049309 1119.86315,817.002007 1118.35735,813.873573 L1118.35735,687.428391 Z M1132.71764,663.685723 C1134.2851,661.573056 1135.90773,659.502579 1137.58553,657.48078 L1137.58553,843.823781 C1135.90773,841.798737 1134.2851,839.731504 1132.71764,837.618838 L1132.71764,663.685723 Z M1147.07793,647.094315 C1148.66486,645.513872 1150.28749,643.969127 1151.94582,642.463325 L1151.94582,858.841235 C1150.28749,857.335433 1148.66486,855.787443 1147.07793,854.210245 L1147.07793,647.094315 Z M1161.43822,634.585449 C1163.03488,633.36523 1164.66076,632.1872 1166.30611,631.031886 L1166.30611,870.269429 C1164.66076,869.117361 1163.03488,867.936085 1161.43822,866.719111 L1161.43822,634.585449 Z M1175.7985,624.900286 C1177.40491,623.949424 1179.02105,623.008298 1180.6664,622.115851 L1180.6664,879.186114 C1179.02105,878.296912 1177.40491,877.355785 1175.7985,876.401678 L1175.7985,624.900286 Z M1190.15879,617.461495 C1191.76844,616.737801 1193.38783,616.033579 1195.02669,615.3683 L1195.02669,885.935612 C1193.38783,885.270333 1191.76844,884.566111 1190.15879,883.842417 L1190.15879,617.461495 Z M1204.51908,611.886782 C1206.12873,611.357804 1207.75136,610.864524 1209.38698,610.390716 L1209.38698,890.911249 C1207.75136,890.440686 1206.12873,889.944161 1204.51908,889.415183 L1204.51908,611.886782 Z M1218.87937,607.979485 C1220.49227,607.628997 1222.1149,607.317451 1223.74726,607.018887 L1223.74726,894.283077 C1222.1149,893.987758 1220.49227,893.672968 1218.87937,893.322479 L1218.87937,607.979485 Z M1233.23966,605.605251 C1234.85255,605.420271 1236.47843,605.270989 1238.10755,605.141178 L1238.10755,896.163383 C1236.47843,896.030327 1234.85255,895.881045 1233.23966,895.69931 L1233.23966,605.605251 Z M1250.03389,604.614796 C1250.8517,604.614796 1251.65328,604.663475 1252.46784,604.676456 L1252.46784,896.626806 C1251.65328,896.639787 1250.8517,896.688466 1250.03389,896.688466 C1249.21609,896.688466 1248.41451,896.639787 1247.59995,896.626806 L1247.59995,604.676456 C1248.41451,604.663475 1249.21609,604.614796 1250.03389,604.614796 Z M1261.96024,605.140205 C1263.58936,605.27326 1265.21524,605.419297 1266.82813,605.604277 L1266.82813,895.698336 C1265.21524,895.883316 1263.58936,896.032598 1261.96024,896.162409 L1261.96024,605.140205 Z M1276.32053,607.020185 C1277.95289,607.315504 1279.57552,607.630295 1281.18842,607.980783 L1281.18842,893.323777 C1279.57552,893.674266 1277.95289,893.985811 1276.32053,894.284375 L1276.32053,607.020185 Z M1290.68081,610.39104 C1292.31643,610.864848 1293.93906,611.358128 1295.54871,611.887106 L1295.54871,889.415507 C1293.93906,889.944485 1292.31643,890.44101 1290.68081,890.911573 L1290.68081,610.39104 Z M1305.0411,615.367002 C1306.67996,616.035526 1308.29935,616.736503 1309.909,617.460196 L1309.909,883.841119 C1308.29935,884.564813 1306.67996,885.269035 1305.0411,885.937559 L1305.0411,615.367002 Z M1319.40139,622.116824 C1321.04674,623.006026 1322.66288,623.950398 1324.26929,624.90126 L1324.26929,876.402652 C1322.66288,877.353514 1321.04674,878.29464 1319.40139,879.187087 L1319.40139,622.116824 Z M1333.76168,631.03286 C1335.40703,632.188174 1337.03291,633.366204 1338.62957,634.586423 L1338.62957,866.71684 C1337.03291,867.937059 1335.40703,869.115089 1333.76168,870.270403 L1333.76168,631.03286 Z M1348.12197,642.462676 C1349.7803,643.968478 1351.40293,645.516469 1352.98986,647.093666 L1352.98986,854.209596 C1351.40293,855.786794 1349.7803,857.334784 1348.12197,858.840586 L1348.12197,642.462676 Z M1362.48226,657.48078 C1364.16006,659.502579 1365.78269,661.573056 1367.35015,663.685723 L1367.35015,837.618838 C1365.78269,839.731504 1364.16006,841.798737 1362.48226,843.823781 L1362.48226,657.48078 Z M1376.84255,678.255331 C1378.55929,681.253954 1380.20464,684.301256 1381.71044,687.429689 L1381.71044,813.874871 C1380.20464,817.003305 1378.55929,820.047362 1376.84255,823.04923 L1376.84255,678.255331 Z M1391.20284,788.100019 L1391.20284,713.202594 C1394.36697,725.158143 1396.07073,737.70433 1396.07073,750.652929 C1396.07073,763.601529 1394.36697,776.147715 1391.20284,788.100019 Z')
		circle11.attr({"id":"circle11","transform":"translate(-1248.5,-1162)","width":"277","height":"277"}).path('M1347.4846,1135.2803 L1347.46513,1135.20566 C1370.27933,1127.92978 1386.80745,1106.56946 1386.80745,1081.34079 C1386.80745,1050.11487 1361.4944,1024.80506 1330.27172,1024.80506 C1305.24101,1024.80506 1284.02348,1041.07681 1276.58534,1063.61841 L1276.47824,1063.61841 C1265.80782,1098.66076 1233.68945,1124.33403 1195.41482,1125.38874 C1195.40508,1125.43418 1195.3921,1125.4861 1195.38561,1125.53153 C1148.47858,1127.20609 1110.9601,1165.7371 1110.9601,1213.04979 C1110.9601,1261.43017 1150.1791,1300.65241 1198.55948,1300.65241 C1245.5087,1300.65241 1283.82228,1263.71808 1286.05177,1217.3238 L1286.19456,1217.34327 C1286.75924,1178.74736 1312.35138,1146.21359 1347.4846,1135.2803')
		circle12.attr({"id":"circle12","transform":"translate(-1246,-1549)","width":"306","height":"283"}).path('M1164.23725,1469.94578 C1170.49412,1391.56943 1261.59514,1386.38026 1281.08944,1467.98888 C1293.77842,1521.1041 1331.93946,1522.23995 1367.65358,1541.45515 C1420.74284,1570.01995 1399.64214,1649.67493 1342.72672,1642.75603 C1264.97022,1633.30258 1265.06109,1655.33143 1218.60839,1679.69037 C1158.55804,1711.17591 1076.02452,1674.5304 1096.86235,1590.19251 C1109.07427,1540.76715 1158.37955,1543.34714 1164.23725,1469.94578')

		triangle1.attr({"id":"triangle1","transform":"translate(-1985,-378)","width":"278","height":"241"}).add(draw.polygon().attr("points",'1846.21824 498.677182 1984.86886 258.52772 2123.51947 498.677182'))
		triangle2.attr({"id":"triangle2","transform":"translate(-1967.5,-766)","width":"217","height":"216"}).add(draw.polygon().attr("points",'2075.27247 658.484966 2075.27247 873.908768 1859.84867 873.908768'))
		triangle3.attr({"id":"triangle3","transform":"translate(-1985,-1158)","width":"182","height":"332"}).path('M2075.14591,1233.50825 L1984.86918,992.768148 L1894.59245,1233.50825 C1894.59245,1283.36847 1935.00896,1323.78497 1984.86918,1323.78497 C2034.72616,1323.78497 2075.14591,1283.36847 2075.14591,1233.50825')
		triangle4.attr({"id":"triangle4","transform":"translate(-1985,-1555)","width":"238","height":"217"}).add(draw.polygon().attr("points",'2057.29079 1447.92894 1911.57199 1448.99339 1866.44986 1509.18977 1986.00535 1663.9304 2103.28591 1507.46004'))
		triangle5.attr({"id":"triangle5","transform":"translate(-2426,-381)","width":"278","height":"241"}).path('M2425.96111,430.785306 C2482.28265,430.785306 2532.00332,458.941208 2561.89868,501.921471 L2564.61172,501.921471 L2425.96111,261.772009 L2287.31049,501.921471 L2290.02353,501.921471 C2319.91889,458.941208 2369.63957,430.785306 2425.96111,430.785306')
		triangle6.attr({"id":"triangle6","transform":"translate(-2421.5,-767)","width":"271","height":"235"}).path('M2421.10262,856.176976 C2468.46075,856.176976 2513.44983,866.227555 2554.16165,884.193331 C2554.82693,883.073716 2555.54413,881.986553 2556.18345,880.850711 C2483.33703,827.427191 2433.22693,744.864455 2423.05303,650.307227 C2422.39424,650.297491 2421.76141,650.206624 2421.09938,650.206624 C2420.44059,650.206624 2419.80452,650.297491 2419.14898,650.307227 C2408.97508,744.864455 2358.86173,827.427191 2286.01531,880.850711 C2286.65462,881.989798 2287.37507,883.073716 2288.04035,884.193331 C2328.75218,866.227555 2373.74126,856.176976 2421.10262,856.176976')
		triangle7.attr({"id":"triangle7","transform":"translate(-2422,-1189)","width":"278","height":"241"}).add(draw.polygon().attr("points",'2422.05998 1139.07596 2520.73869 1309.99423 2560.71059 1309.99423 2422.05998 1069.84477 2283.40936 1309.99423 2323.38127 1309.99423'))
		triangle8.attr({"id":"triangle8","transform":"translate(-2453.5,-1554)","width":"163","height":"257"}).add(draw.polygon().attr("points",'2438.59264 1558.20071 2372.13615 1426.22884 2372.13615 1682.44235 2534.3993 1682.44235 2465.50237 1544.64849'))
		triangle9.attr({"id":"triangle9","transform":"translate(-2834.5,-378)","width":"281","height":"244"}).path('M2697.48155,497.785059 L2798.44168,322.917308 L2899.39857,497.785059 L2697.48155,497.785059 Z M2971.69005,497.785059 L2900.52468,497.785059 L2799.00312,321.943729 L2834.58742,260.312939 L2971.69005,497.785059 Z M2835.3598,258.080198 L2834.58742,256.74315 L2695.16444,498.22966 L2694.39206,499.569954 L2974.78279,499.569954 L2835.3598,258.080198 Z')
		triangle10.attr({"id":"triangle10","transform":"translate(-2848,-783)","width":"376","height":"189"}).path('M2848.25809,696.917966 L2667.974,877.202061 L2660.70786,877.202061 L2660.66891,877.163118 L2848.25809,689.573936 L3035.84728,877.163118 L3035.80833,877.202061 L3028.54219,877.202061 L2848.25809,696.917966 Z M2848.25809,710.469211 L3014.95103,877.16539 L3014.91533,877.201088 L3007.64594,877.201088 L2848.25809,717.813241 L2688.87025,877.201088 L2681.60086,877.201088 L2681.56516,877.16539 L2848.25809,710.469211 Z M2848.25809,731.363837 L2994.05803,877.163767 L2994.01908,877.20271 L2986.75294,877.20271 L2848.25809,738.707867 L2709.76325,877.20271 L2702.49711,877.20271 L2702.45816,877.163767 L2848.25809,731.363837 Z M2848.25809,752.258462 L2973.16178,877.16539 L2973.12608,877.201088 L2965.85669,877.201088 L2848.25809,759.602493 L2730.6595,877.201088 L2723.39011,877.201088 L2723.35441,877.16539 L2848.25809,752.258462 Z M2848.25809,773.153088 L2952.26877,877.163767 L2952.22983,877.20271 L2944.96369,877.20271 L2848.25809,780.497118 L2751.5525,877.20271 L2744.28636,877.20271 L2744.24742,877.163767 L2848.25809,773.153088 Z M2848.25809,794.049012 L2931.37253,877.163443 L2931.33683,877.202386 L2924.06744,877.202386 L2848.25809,801.393042 L2772.44875,877.202386 L2765.17936,877.202386 L2765.14366,877.163443 L2848.25809,794.049012 Z M2848.25809,814.943638 L2910.47952,877.165065 L2910.44058,877.204009 L2903.17444,877.204009 L2848.25809,822.287668 L2793.34175,877.204009 L2786.07561,877.204009 L2786.03667,877.165065 L2848.25809,814.943638 Z M2848.25809,835.838264 L2889.58327,877.163443 L2889.54758,877.202386 L2882.27819,877.202386 L2848.25809,843.182294 L2814.238,877.202386 L2806.96861,877.202386 L2806.93292,877.163443 L2848.25809,835.838264 Z M2848.25809,856.73289 L2868.69027,877.165065 L2868.65133,877.204009 L2861.38518,877.204009 L2848.25809,864.07692 L2835.13101,877.204009 L2827.86486,877.204009 L2827.82592,877.165065 L2848.25809,856.73289 Z')
		triangle11.attr({"id":"triangle11","transform":"translate(-2854,-1229)","width":"302","height":"172"}).path('M2906.35285,1143.40287 L3005.03156,1314.32114 L2900.32639,1314.32114 L2854.00026,1234.08201 L2906.35285,1143.40287 Z M2702.96767,1314.31984 L2801.64638,1143.40157 L2853.99896,1234.08071 L2807.67284,1314.31984 L2702.96767,1314.31984 Z')
		triangle12.attr({"id":"triangle12","transform":"translate(-2845,-1567)","width":"266","height":"237"}).path('M2887.24376,1578.20516 C2873.95117,1573.83703 2859.76612,1571.44203 2845.01316,1571.44203 C2830.26019,1571.44203 2816.07515,1573.83703 2802.78255,1578.20516 C2800.92301,1569.27095 2799.93645,1560.01546 2799.93645,1550.52631 C2799.93645,1510.48301 2817.35378,1474.519 2845.01316,1449.75765 C2872.66929,1474.519 2890.08986,1510.48301 2890.08986,1550.52631 C2890.08986,1560.01546 2889.1033,1569.2677 2887.24376,1578.20516 Z M2802.78255,1578.20548 C2808.77006,1606.98447 2823.90921,1632.40137 2845.01316,1651.29529 C2821.08583,1672.71403 2789.50293,1685.75674 2754.85975,1685.75674 C2740.10678,1685.75674 2725.92174,1683.36174 2712.62914,1678.99361 C2722.51421,1631.48296 2757.33589,1593.13693 2802.78255,1578.20548 Z M2887.24376,1578.20516 C2932.69367,1593.13661 2967.5121,1631.47939 2977.39717,1678.99329 C2964.10457,1683.36141 2949.91953,1685.75642 2935.16656,1685.75642 C2900.52338,1685.75642 2868.94048,1672.7137 2845.01316,1651.29497 C2866.1171,1632.40105 2881.25625,1606.98415 2887.24376,1578.20516 Z')

		rectangle1.attr({"id":"rectangle1","transform":"translate(-3583,-379)","width":"228","height":"229"}).add(draw.polygon().attr("points",'3469.1853 493.122265 3696.35371 493.122265 3696.35371 265.953855 3469.1853 265.953855'))
		rectangle2.attr({"id":"rectangle2","transform":"translate(-3582.5,-782)","width":"119","height":"212"}).add(draw.polygon().attr("points",'3523.84202 887.042023 3641.70023 887.042023 3641.70023 676.85932 3523.84202 676.85932'))
		rectangle3.attr({"id":"rectangle3","transform":"translate(-3593,-1219)","width":"178","height":"178"}).add(draw.polygon().attr("points",'3588.24102 1224.3248 3588.24102 1130.86447 3504.88319 1130.86447 3504.88319 1307.68263 3681.70134 1307.68263 3681.70134 1224.3248'))
		rectangle4.attr({"id":"rectangle4","transform":"translate(-3599,-1578)","width":"218","height":"253"}).add(draw.polygon().attr("points",'3707.98668 1641.58806 3598.99452 1704.51371 3490.00561 1641.58806 3490.00561 1515.73676 3598.99452 1452.81111 3707.98668 1515.73676'))
		rectangle5.attr({"id":"rectangle5","transform":"translate(-4057,-383)","width":"298","height":"173"}).add(draw.polygon().attr("points",'4205.75582 297.738935 4007.57086 297.738935 3908.47675 469.374404 4106.66172 469.374404'))
		rectangle6.attr({"id":"rectangle6","transform":"translate(-4057,-788)","width":"228","height":"228"}).add(draw.polygon().attr("points",'4057.11629 788.448662 4170.69076 902.026376 4170.70049 902.026376 4170.70049 674.854721 3943.53208 674.854721 3943.53208 902.026376 3943.54182 902.026376'))
		rectangle7.attr({"id":"rectangle7","transform":"translate(-4057,-1218)","width":"228","height":"192"}).add(draw.polygon().attr("points",'4135.53515 1122.70264 4135.53515 1278.68296 3978.69808 1278.68296 3978.69808 1122.70264 3943.53241 1122.70264 3943.53241 1313.84863 4170.70082 1313.84863 4170.70082 1122.70264'))
		rectangle8.attr({"id":"rectangle8","transform":"translate(-4057,-1574)","width":"228","height":"228"}).path('M4057.11629,1564.91386 C4052.58266,1506.33686 4003.65058,1460.20869 3943.91178,1460.20869 L3943.91178,1687.3771 C4003.65058,1687.3771 4052.58266,1641.24893 4057.11629,1582.67518 C4061.64992,1641.24893 4110.582,1687.3771 4170.3208,1687.3771 L4170.3208,1460.20869 C4110.582,1460.20869 4061.64992,1506.33686 4057.11629,1564.91386')
		rectangle9.attr({"id":"rectangle9","transform":"translate(-4488,-385)","width":"228","height":"228"}).path('M4376.69389,496.799148 L4599.86089,496.799148 L4599.86089,273.632147 L4376.69389,273.632147 L4376.69389,496.799148 Z M4374.69481,498.801475 L4374.69481,271.633065 L4601.86321,271.633065 L4601.86321,498.801475 L4374.69481,498.801475 Z M4425.71358,447.782696 L4425.71358,322.651845 L4550.84444,322.651845 L4550.84444,447.782696 L4425.71358,447.782696 Z M4424.59072,448.905557 L4551.9673,448.905557 L4551.9673,321.528984 L4424.59072,321.528984 L4424.59072,448.905557 Z')
		rectangle10.attr({"id":"rectangle10","transform":"translate(-4488,-784)","width":"236","height":"236"}).path('M4370.96275,901.483444 L4370.96275,666.471233 L4375.83065,666.471233 L4375.83065,901.483444 L4370.96275,901.483444 Z M4385.32304,901.483444 L4385.32304,666.471233 L4390.19094,666.471233 L4390.19094,901.483444 L4385.32304,901.483444 Z M4399.68333,901.483444 L4399.68333,666.471233 L4404.55122,666.471233 L4404.55122,901.483444 L4399.68333,901.483444 Z M4414.04362,901.483444 L4414.04362,666.471233 L4418.91151,666.471233 L4418.91151,901.483444 L4414.04362,901.483444 Z M4428.40391,901.483444 L4428.40391,666.471233 L4433.2718,666.471233 L4433.2718,901.483444 L4428.40391,901.483444 Z M4442.7642,901.483444 L4442.7642,666.471233 L4447.63209,666.471233 L4447.63209,901.483444 L4442.7642,901.483444 Z M4457.12449,901.483444 L4457.12449,666.471233 L4461.99238,666.471233 L4461.99238,901.483444 L4457.12449,901.483444 Z M4471.48477,901.483444 L4471.48477,666.471233 L4476.35267,666.471233 L4476.35267,901.483444 L4471.48477,901.483444 Z M4485.84506,901.483444 L4485.84506,666.471233 L4490.71296,666.471233 L4490.71296,901.483444 L4485.84506,901.483444 Z M4500.20535,901.483444 L4500.20535,666.471233 L4505.07325,666.471233 L4505.07325,901.483444 L4500.20535,901.483444 Z M4514.56564,901.483444 L4514.56564,666.471233 L4519.43353,666.471233 L4519.43353,901.483444 L4514.56564,901.483444 Z M4528.92593,901.483444 L4528.92593,666.471233 L4533.79382,666.471233 L4533.79382,901.483444 L4528.92593,901.483444 Z M4543.28622,901.483444 L4543.28622,666.471233 L4548.15411,666.471233 L4548.15411,901.483444 L4543.28622,901.483444 Z M4557.64651,901.483444 L4557.64651,666.471233 L4562.5144,666.471233 L4562.5144,901.483444 L4557.64651,901.483444 Z M4572.0068,901.483444 L4572.0068,666.471233 L4576.87469,666.471233 L4576.87469,901.483444 L4572.0068,901.483444 Z M4586.36708,901.483444 L4586.36708,666.471233 L4591.23498,666.471233 L4591.23498,901.483444 L4586.36708,901.483444 Z M4600.72737,901.483444 L4600.72737,666.471233 L4605.59527,666.471233 L4605.59527,901.483444 L4600.72737,901.483444 Z')
		rectangle11.attr({"id":"rectangle11","transform":"translate(-4488.5,-1212)","width":"215","height":"215"}).add(draw.polygon().attr("points",'4595.37269 1176.62982 4523.9769 1176.62982 4523.9769 1105.23404 4452.58112 1105.23404 4452.58112 1176.62982 4381.18533 1176.62982 4381.18533 1248.02561 4452.58112 1248.02561 4452.58112 1319.42139 4523.9769 1319.42139 4523.9769 1248.02561 4595.37269 1248.02561'))
		rectangle12.attr({"id":"rectangle12","transform":"translate(-4495,-1574)","width":"222","height":"222"}).add(draw.polygon().attr("points",'4533.09869 1606.46004 4533.09869 1463.45428 4455.24807 1463.45428 4455.24807 1535.35308 4384.34881 1535.35308 4384.34881 1684.13216 4605.0267 1684.13216 4605.0267 1606.46004'))
		

		people1.attr({"id":"people1","width":104,"height":432, "x":-51, "y":-32})
		var people1_part1 = draw.group().addClass('skin').translate(4.000000, 9.000000)
		people1_part1.add(draw.path('M0.206411819,200.503922 C-0.319849739,192.80476 0.16019455,188.659414 1.64654469,188.067885 C2.89028491,187.572909 7.02986938,184.564098 9.45309716,186.843153 C10.8566408,188.163191 10.0739744,190.869716 10.5723377,193.673833 C10.755947,194.706938 15.0264426,194.54514 15.7312092,195.540283 C17.6286431,198.219494 18.472105,203.982142 18.9711914,207.263672 C19.4702778,210.545202 18.2960268,217.601936 18.4645996,219.238128 C18.6881365,221.40781 16.1151249,221.120205 14.9472656,219.87085 C13.7794064,218.621494 13.3722029,210.798167 12.738798,210.609784 C12.8514743,211.497956 13.3342162,213.836534 14.0241699,218.612305 C14.5222901,222.060228 16.5732386,228.188024 16.9128418,230.100506 C17.7228344,234.661997 13.055497,234.809759 10.5723377,234.069336 C9.76678388,233.829138 9.67221032,229.774636 8.2950547,227.173156 C7.23272548,225.166391 6.19627861,222.869881 5.48801969,220.920476 C5.16147632,220.021702 6.52208004,227.811149 6.83683861,229.877166 C7.08665478,231.516913 5.79450097,230.352374 5.66042072,230.100506 C4.9480246,228.762283 2.32197702,221.104975 1.22533114,215.856469 C0.49423388,212.357466 0.154594108,207.23995 0.206411819,200.503922 Z M93.7935882,200.250766 C93.8454059,206.86922 93.5057661,211.897413 92.7746689,215.335344 C91.678023,220.49224 89.680242,225.409887 87.6312995,227.024399 C87.0077138,227.515768 86.2375284,227.522142 86.7675412,226.458202 C89.2089151,221.557421 88.8385237,219.427875 88.5119803,220.310961 C88.3195047,220.831483 88.1007373,221.346665 87.8622319,221.851175 C86.0853729,225.609757 84.747096,229.541938 83.4890137,229.910522 C81.0058544,230.638022 74.9971363,231.506271 75.8071289,227.024399 C76.1467321,225.145298 79.6639892,222.045719 80.1621094,218.657977 C80.8520631,213.965565 80.8370606,214.224232 80.9497369,213.351562 C80.3163319,213.536657 80.1698124,219.083413 79.0019531,220.310961 C77.8340939,221.53851 73.6416974,220.789789 73.8652344,218.657977 C74.0338072,217.050344 73.366148,206.65394 73.8652344,203.429687 C74.3643208,200.205435 79.0523029,198.888306 80.9497369,196.255859 C83.5674236,192.624154 82.6262594,188.60328 84.5469028,186.828436 C86.9701306,184.589161 91.1097151,187.545455 92.3534553,188.031792 C93.8398055,188.612996 94.3198497,192.685987 93.7935882,200.250766 Z'))
		people1_part1.add(draw.path('M27.9285494,13.0804231 C37.87773,4.36014105 45.3691999,0 50.4029592,0 C55.4367186,0 61.3023988,4.99830405 68,14.9949121 L67.7568497,83.2711126 C37.2108655,98.4724314 23.8348262,97.5201582 27.6287317,80.4142928 C29.954794,69.9266019 30.0547333,47.4819786 27.9285494,13.0804231 Z'))
		people1_part1.add(draw.path('M22.8127639,156.999936 C20.7246743,165.921399 18.657745,173.1662 16.6119761,178.734339 C13.5433228,187.086548 22.4300805,185.062755 33.994424,187.931099 C45.5587674,190.799444 75.9392737,187.244262 77.7353103,184.887585 C78.932668,183.316466 79.2798178,181.656659 78.7767599,179.908163 C75.7085059,171.954252 73.7683392,164.449002 72.95626,157.392414 C72.1441808,150.335826 55.4296821,150.205 22.8127639,156.999936 Z'))
		people1.add(people1_part1)
		people1.add(draw.path('M0.0561570424,137.672008 C1.2442865,121.181388 2.46871398,101.917342 5.25155478,93.3883298 C8.03439558,84.8593176 13.7179135,81.940139 21.5579423,81.319292 C29.3619526,80.7012973 27.5228357,71.5360137 30.4267157,71.000948 C31.2625878,70.8469311 34.1268015,89.5116459 50.9120706,89.1966083 C67.6973396,88.8815707 72.5474753,72.3511661 73.1951987,73.8917168 C74.2152807,76.3178886 76.2368374,79.4556328 85.9837068,81.9887505 C92.7740535,83.7534964 99.502168,86.7594443 100.490137,98.2337229 C101.478107,109.708001 103.556564,138.701409 104,154.235 C102.388538,155.078656 101.529548,208.745472 98.3842743,205.889975 C96.3328217,204.027526 89.5512492,202.512169 84.937723,203.689503 C85.8118774,200.000885 87.2153246,158.339298 86.4999445,156.569391 C85.7186028,152.541637 87.6697427,151.791432 87.6128028,150.681641 C87.5558629,149.571849 85.6282179,150.486375 85.8743073,147.958093 C87.0420388,135.961014 84.5536546,118.718909 83.5408298,117.10144 C82.5280051,115.483971 80.7546969,115.933648 80.9225067,118.098052 C81.0903164,120.262456 81.9838312,125.844726 82.8707245,129.813132 C84.4406946,136.837966 81.3179903,144.183338 79.4307496,148.02234 C77.5435089,151.861343 76.8656865,155.330642 77.6316179,160.610808 C78.1422389,164.130919 78.4679042,167.035857 78.608614,169.325622 C64.1833791,168.840974 52.9649183,169.283564 44.9532315,170.653392 C35.8801156,172.204701 30.3927612,170.575387 25.3684661,168.529111 C23.6986677,167.849041 27.3438048,158.867232 26.1577163,153.68212 C24.9977936,148.611394 22.850596,145.88619 21.437462,142.416415 C18.3355169,134.799974 20.0670367,128.157789 21.322961,123.112546 C22.1902897,119.628351 21.3881565,116.912259 19.5346417,117.0301 C15.8370741,117.265179 15.7179488,140.811135 15.6624824,145.059824 C15.6140977,148.766067 16.5359761,147.767002 16.5187458,150.256632 C16.5119583,151.237369 15.5729101,152.050236 15.5680624,153.2392 C15.5077118,168.041025 15.8660731,196.838046 16.1049409,199.466942 C12.7004025,199.878132 6.97556784,197.630665 3.29098553,201.759328 C1.76809139,203.465767 -0.374805168,143.653539 0.0561570424,137.672008 Z').addClass('cloth'))
		people1.add(draw.path('M51.0528338,115.952092 L62,115.952092 L62,122.164642 C61.9436437,125.218639 60.8869779,127.777543 58.8299712,129.84143 C56.7588753,131.891373 54.1524333,132.944219 51.0105668,133 C48.5872437,132.944219 46.56549,132.35853 44.945245,131.242915 C43.2968217,130.169135 42.0992673,128.928032 41.3525456,127.519568 C41.1271202,127.059377 40.9228315,126.62011 40.7396734,126.201754 C40.5706043,125.769454 40.4297156,125.225599 40.3170029,124.570175 C40.1056666,123.342999 40,120.986297 40,117.5 C40,113.957922 40.1056666,111.587275 40.3170029,110.387989 C40.5424283,109.188703 40.8876057,108.219527 41.3525456,107.480432 C42.0992673,106.071968 43.2968217,104.81692 44.945245,103.71525 C46.56549,102.599635 48.5872437,102.02789 51.0105668,102 C53.9833642,102.02789 56.4066509,102.899452 58.2804995,104.61471 C60.1543481,106.343913 61.3378137,108.484468 61.8309318,111.036437 L56.8856868,111.036437 C56.5052815,109.809261 55.8149266,108.763387 54.8146013,107.898785 C53.7720089,107.076019 52.50401,106.650697 51.0105668,106.622807 C49.9116179,106.650697 48.9676632,106.866845 48.1786744,107.271255 C47.3755964,107.689611 46.7275081,108.212547 46.23439,108.840081 C45.6285593,109.495505 45.2270263,110.339176 45.0297791,111.37112 C44.8043537,112.458845 44.6916427,114.501784 44.6916427,117.5 C44.6916427,120.498216 44.8043537,122.52721 45.0297791,123.587045 C45.2270263,124.646879 45.6285593,125.504495 46.23439,126.159919 C46.7275081,126.787453 47.3755964,127.296444 48.1786744,127.68691 C48.9676632,128.147101 49.9116179,128.377193 51.0105668,128.377193 C52.828059,128.377193 54.3285243,127.763614 55.5120077,126.536437 C56.695491,125.365041 57.3013127,123.824121 57.3294909,121.91363 L57.3294909,120.323887 L51.0528338,120.323887 L51.0528338,115.952092 Z').addClass('logo'))
		var people1_part2 = draw.group().addClass('hair').translate(1.000000, 0.000000)
		people1_part2.add(draw.path('M90.803096,235.881233 C90.1172117,252.998115 87.8173316,266.505437 86.7578632,275.925585 C85.5031098,287.082091 83.6354864,302.465965 84.2269154,310.114023 C84.8139086,317.775449 80.2935404,349.289085 79.4868904,360.601331 C78.6802403,371.913578 78.0755533,382.513903 77.7894389,388.077036 C77.9694515,388.242762 74.6534072,388.059 67.841306,387.525749 C67.3642147,391.448654 66.824127,395.623163 66.2210429,400.049274 C67.9153611,403.774437 74.8673416,410.148995 76.5295741,411.600035 C79.1409527,413.87963 85.6429263,416.441225 87.3344132,418.840063 C88.9933715,421.201767 89.8163621,422.441195 89.6389334,424.587523 C89.4644618,426.768014 85.6512234,429.056936 81.0380773,429.634736 C77.003053,430.114504 70.8255772,429.122291 67.3006604,427.137866 C63.7890508,425.132646 61.2844829,421.796978 58.0935896,419.087278 C54.9026964,416.377579 53.5544727,416.704857 51.959806,414.594454 C51.2030456,407.647935 52.8619919,403.968883 53.4685182,397.44916 C53.965158,392.110638 53.9696591,386.603737 54.2055111,382.414853 C54.7293997,373.110253 54.6538948,339.768441 55.7328504,333.524959 C57.728791,321.975254 60.9597361,317.818622 60.9597361,312.81894 C60.9597361,307.796977 61.7265155,303.131792 60.1774743,292.414077 C58.6284331,281.696362 55.2511586,238.884988 54.6774725,235.486511 C54.1023078,232.074666 53.420961,231.139505 51.5062097,231.41281 C49.5929369,231.717306 48.2681289,231.750842 47.984243,235.00821 C47.6811356,238.261123 42.8204212,289.74881 41.775903,298.383067 C40.3549949,303.852119 40.8751798,319.615949 40.9727656,325.661316 C41.1147086,331.706684 40.0957045,370.787954 40.0957045,382.730154 C40.0957045,393.611636 40.8848986,407.634557 40.7647768,410.579848 C40.7777799,410.580127 40.403701,415.891733 40.403701,416.675996 C40.403701,417.492938 33.3837312,419.632913 29.7464429,421.40939 C26.1239404,423.173984 25.7262044,426.605138 21.352587,429.186673 C16.9168696,431.735531 10.1524005,432.216784 7.91827751,431.92417 C4.67724664,431.54095 2.33370927,431.159216 0.976379741,429.87439 C-0.41052124,428.577681 -0.23752826,424.859854 0.976379741,421.921835 C2.15923772,418.945197 6.12671912,416.414443 9.02822968,415.415669 C11.9297402,414.416896 20.9404438,405.228367 27.3142016,400.918418 C28.6346926,399.170816 25.2931905,389.645377 25.2317962,386.45209 C25.1704019,383.258802 12.1235719,390.268922 11.8184455,385.615804 C11.2305551,376.650589 14.5120564,342.087405 14.6702636,334.252193 C14.7988994,326.428864 16.3953965,314.453923 16.8084781,307.545044 C17.2215598,300.636166 16.852332,298.847876 15.5104276,281.103821 C14.5580122,268.509993 12.0743035,251.663614 11.2276562,236.045385 C12.6256691,238.705107 14.0797134,240.885267 14.898416,241.129386 C17.3815753,241.869809 19.3615573,243.438656 18.5515646,238.877166 C18.2119615,236.964683 16.9440546,231.055489 16.4459344,227.607565 C15.7559807,222.831795 15.8514743,220.497956 15.738798,219.609784 C16.3722029,219.798167 17.56335,226.988773 18.7312092,228.238128 C19.8990685,229.487483 20.1494883,227.261966 19.9259514,225.092284 C19.7573785,223.456092 19.050651,217.765403 18.5515646,214.483873 C18.0524783,211.202343 16.7156395,208.427644 14.8182055,205.748433 C14.0354485,204.643166 13.6810786,203.474729 13.5175355,202.331432 C15.7922812,192.103627 18.7390378,186 18.7390378,186 C32.0327506,188.640391 41.7258584,190.023173 47.8183611,190.148347 C59.3799449,190.621754 71.0925585,189.673638 82.9562019,187.303999 C83.6535664,190.4521 85.1467474,193.887184 86.6595268,198.374554 C86.5477207,200.446004 86.9154208,203.155642 85.1817945,205.560826 C83.2843605,208.193273 81.9475217,210.919542 81.4484354,214.143794 C80.949349,217.368047 80.2426215,222.959409 80.0740486,224.567043 C79.8505117,226.698854 80.1009315,228.885526 81.2687908,227.657977 C82.43665,226.430429 83.6277971,219.36533 84.261202,219.180236 C84.1485257,220.052906 84.6396906,222.712015 83.9497369,227.404427 C83.4516167,230.792169 81.6413771,234.052571 81.3017739,235.931673 C80.4917812,240.413545 82.4717633,238.872082 84.9549225,238.144582 C86.2357286,237.76934 89.1896623,234.494466 90.9574258,230.646943 C90.9432806,231.39959 90.9257527,232.145893 90.9050567,232.885815 C90.6204921,233.634448 90.2486027,234.492525 89.7675412,235.458202 C89.2375284,236.522142 90.0077138,236.515768 90.6312995,236.024399 C90.6886112,235.979239 90.7458829,235.931494 90.803096,235.881233 Z'))
		people1_part2.add(draw.path('M65.4560488,49.8935233 C67.251272,44.6063723 67.7274503,38.9685183 67.8106052,37.1692371 C67.8660418,35.9697164 68.1570096,31.9483179 68.0083356,29.8531772 C62.9624491,27.4511528 63.657507,20.9259651 61.3922659,16.6729129 C59.1270247,12.4198608 56.2382847,10.444676 52.7260457,10.7473586 C49.8958217,11.1080659 46.5602979,13.7529865 44.3572688,17.4530284 C41.7291565,21.8670079 40.173497,28.7844786 34.0318171,30.2089106 C33.8835419,34.5040156 34.1418383,36.0245844 34.3385707,39.1039693 C34.6336693,43.7230466 36.0296957,48.7000341 37.2262009,51.1732044 C38.3216782,53.4375508 40.2741358,56.5039106 41.6840761,58.1441446 C41.6285713,58.1481424 41.7568448,60.6719149 41.7038759,64.8181417 C41.650907,68.9643685 41.5091551,71.2060582 42.3575599,72.9223893 C43.6471429,75.5312283 44.1574392,76.1331436 46.2958887,77.2649167 L46.8012689,78.1861153 L43.5505311,77.3835151 C42.974196,79.2297107 43.5290709,80.469216 45.2151556,81.1020309 C46.9012403,81.7348457 48.2518642,81.8142982 49.2670274,81.3403883 L50.2949083,81.3433757 C50.2949083,81.9675735 49.7023448,82.7427717 48.5172179,83.6689703 C47.332091,84.5951689 45.8419951,84.9600473 44.0469301,84.7636054 C41.1282593,87.4192736 36.0121057,87.3297384 33.4282181,86.6049634 C29.5523866,85.5178009 27.7627301,83.2838971 26.4872144,81.2677086 C25.6368707,79.9235829 24.9998903,77.9455652 24.5762734,75.3336555 C24.0006789,76.0409271 23.7128141,76.9560851 23.7126789,78.0791295 C23.7124761,79.7636962 24.3224515,80.71087 25.0418567,81.3973548 C25.7612619,82.0838396 26.8044258,82.6651982 27.663147,82.9956971 L27.9193047,83.7086236 C26.3230003,83.3959862 25.1240143,82.9468896 24.3223466,82.3613339 C23.119845,81.4830003 19.8849151,79.5160905 20.0031573,75.5693454 C20.0819855,72.938182 20.7372334,70.7418366 21.9988555,67.5992754 C23.2604776,64.4567142 24.9604762,61.1750961 25.4161382,54.7300787 C26.0996313,45.0625525 25.9200219,30.713696 28.0066025,21.68639 C30.093183,12.659084 32.3591299,10.2253329 36.3149161,5.72683922 C40.2707023,1.22834551 46.58556,0.389000025 48.2689405,0.126853101 C49.3911941,-0.0479115145 51.4276793,-0.315120359 53.2089528,1.45083704 C54.3934036,0.461222303 56.5097306,0.461222303 59.5579338,1.45083704 C64.1302386,2.93525914 70.5980191,8.4192266 73.6419467,16.1209667 C76.6858744,23.8227067 75.7470011,28.347205 76.6927189,43.8051359 C77.6384367,59.2630668 81.267406,64.0071775 79.5405006,74.3285401 C79.0067098,77.5188988 77.2054858,80.261481 74.9608652,83.0457837 C72.7162446,85.8300864 66.7225667,87.357965 66.2182286,86.9311516 C67.2713862,85.7120081 68.098203,84.1159305 68.6986793,82.1429188 C67.4969214,83.4809857 66.3014439,85.2062793 64.945772,86.2081468 C63.5901001,87.2100142 61.631794,88.0797994 59.1737881,87.9941674 C57.8419569,87.485492 57.6819344,87.0610348 58.6937204,86.7207958 C59.7055064,86.3805568 60.9975178,85.1078584 62.5697547,82.9027006 C61.9100074,83.6061652 61.0298522,84.1455197 59.9292889,84.5207641 C58.8287256,84.8960085 57.433175,84.9465337 56.4033384,84.7014496 C55.5764021,84.5046524 54.9361292,84.1869322 54.4825197,83.7482891 C56.2783081,83.3278177 57.7625717,82.6462677 58.9353104,81.7036392 C60.6944185,80.2896964 62.2718976,75.9987188 62.0508428,75.0190285 C61.5802927,76.3658404 60.7615325,77.262816 59.3322759,78.6069307 C57.9030194,79.9510454 57.029083,79.9452334 54.6336967,80.8719963 C54.2096086,81.0360738 53.6774285,81.135498 53.0371563,81.1702689 C53.7778169,80.7886372 54.7088519,80.1511704 55.7445372,79.0623845 C57.7092015,76.9969899 57.7392975,75.9210988 58.9810562,73.0236849 C59.8171372,71.072845 59.8105005,67.3151682 59.8986817,63.9592269 C59.9868628,60.6032856 59.949114,59.325309 60.0557212,58.3326558 C61.6407672,56.4888915 64.3567141,53.1311976 65.4560488,49.8935233 Z'))
		people1.add(people1_part2)

		people2.attr({"id":"people2","width":191,"height":426, "x":-146, "y":-40})
		var people2_part1 = draw.group().addClass('hair')
		people2_part1.add(draw.path('M36.6997133,379.702893 C43.5783354,366.27877 50.0062235,355.060729 55.9833776,346.048768 C64.9491087,332.530828 78.9473562,318.885418 86.5109172,314.886938 C94.0744781,310.888459 95.4674705,307.763914 99.0121567,296.699516 C101.375281,289.323251 105.604906,277.020185 111.701032,259.790317 C112.380872,275.174419 112.783338,285.54368 112.908428,290.898101 C113.096064,298.929731 110.108167,311.94493 109.179165,319.746605 C108.250164,327.54828 107.37215,340.504333 106.754176,346.048768 C106.136201,351.593204 101.540142,373.002049 100.448999,375.237363 C102.113247,376.640553 109.854926,377.71708 123.674036,378.466943 C125.752307,367.322325 127.972325,356.516266 130.334089,346.048768 C133.876736,330.347522 138.077128,309.488328 139.650618,305.146189 C141.224108,300.804051 143.422711,289.476555 144.629087,276.681624 C145.835463,263.886694 151.63178,248.330253 151.907115,237.92462 C152.090672,230.987532 152.090672,221.656727 151.907115,209.932205 C147.770968,204.516598 136.669519,200.17514 118.602769,196.907828 C100.536018,193.640517 86.8878885,192.006861 77.6583794,192.006861 C76.2524701,197.015243 75.4801717,202.990357 75.3414843,209.932205 C75.1334533,220.344975 78.4344168,233.284712 77.6583794,242.00774 C76.8823419,250.730768 73.927077,282.505475 72.3729626,287.057684 C70.8188481,291.609893 68.9761415,289.782483 67.3200511,290.898101 C65.6639606,292.013718 67.2262331,296.374212 65.6639606,296.699516 C64.1016881,297.024819 53.1780174,302.910875 49.0928583,311.921476 C45.0076992,320.932076 32.6114949,343.667629 27.0058734,350.944637 C23.2687924,355.795976 20.6231947,359.290014 19.0690802,361.426751 C17.8535262,364.905493 18.7335792,368.825451 21.7092393,373.186625 C24.6848993,377.5478 29.681724,379.719889 36.6997133,379.702893 Z'))
		people2_part1.add(draw.path('M98.4247749,378.706587 C99.3510621,379.67153 100.052628,380.364253 100.529471,380.784757 C102.914053,382.887597 105.450906,384.301698 108.14003,385.02706 C113.383636,386.441468 119.260514,386.757593 120.252741,385.02706 C121.244967,383.296527 124.243062,380.823609 125.118016,382.925335 C125.992971,385.02706 127.195268,388.886852 130.941866,393.334026 C134.688465,397.7812 140.777453,401.274899 146.336166,403.626466 C151.894878,405.978032 157.403622,409.834765 157.473986,412.269953 C157.520895,413.893411 156.510652,416.440432 154.443259,419.911015 C151.11952,420.748578 147.075152,420.957969 142.310153,420.539187 C135.162654,419.911015 130.33103,418.991192 126.706803,417.302469 C123.082575,415.613746 119.268672,413.553831 108.14003,412.269953 C100.720935,411.414034 94.6261684,409.987049 89.8557304,407.988999 C89.8557304,403.028206 90.393144,398.557918 91.4679712,394.578134 C92.5427984,390.59835 94.861733,385.307834 98.4247749,378.706587 Z M15.1368851,364.75015 C15.6018958,366.83386 15.6018958,368.476013 15.1368851,369.676611 C14.4393692,371.477507 14.5556219,374.65304 16.5196799,378.086573 C17.8290519,380.375594 20.2101918,381.705022 23.6630997,382.074855 C27.4810816,382.074855 30.5587178,382.030665 32.896008,381.942286 C36.4019434,381.809717 37.5644699,383.567784 36.1347662,387.046185 C34.7050625,390.524587 34.4868338,394.775967 34.63062,399.388342 C34.7744062,404.000718 34.63062,408.032849 38.5169259,412.571802 C42.4032318,417.110754 41.8321661,419.150274 41.9718732,421.327462 C42.1115804,423.50465 34.9498049,425.723648 30.277264,425.006757 C25.604723,424.289865 16.9388013,425.006757 11.7563803,416.904762 C6.57395924,408.802768 7.97510967,399.884966 4.50690543,392.465191 C1.03870119,385.045416 0.333027177,379.41736 0.333027177,377.033161 C0.333027177,374.648961 3.95725472,372.764445 5.68880744,370.963548 C6.84317592,369.762951 9.99253515,367.691818 15.1368851,364.75015 Z'))
		people2_part1.add(draw.path('M156.658309,38.5457854 C159.539597,38.1662125 161.78809,38.3261877 163.403788,39.0257111 C165.827335,40.0749962 166.622254,40.2986744 168.035642,41.6432281 C169.449029,42.9877819 170.344888,42.451388 170.791034,41.6432281 C171.237179,40.8350682 165.855394,37.3658442 164.253861,35.8775043 C163.186172,34.8852777 162.014808,33.651028 160.739768,32.1747552 C160.818969,22.2592874 160.818969,16.3679631 160.739768,14.5007823 C160.620966,11.7000111 156.640842,7.32167092 152.315529,5.03128965 C147.990217,2.74090837 145.894609,1.13376639 141.157824,0.871688033 C136.421038,0.609609676 130.922481,1.36289717 126.510499,3.54142008 C122.098517,5.71994299 121.501094,7.36924482 119.999141,12.1763737 C118.997839,15.3811263 118.049271,18.9102604 117.153438,22.7637761 L132.834541,27.7500159 L156.658309,38.5457854 Z'))
		people2.add(people2_part1)
		people2.add(draw.path('M142.934324,59.0267467 C139.145815,57.4755597 140.674398,60.5352464 143.131499,61.5738263 C144.749997,62.2579409 146.005462,62.1362917 146.246562,61.6248301 C146.316419,61.4766377 146.402645,61.3092081 146.505239,61.1225413 C146.652404,61.9162973 146.144551,63.0527854 145.85556,63.2863995 C144.687425,64.2306974 143.561398,63.7449995 143.227937,65.4372915 C142.894475,67.1295834 141.581466,69.8428715 139.163638,70.2921195 C136.745811,70.7413674 135.536397,70.1126951 133.074873,68.8289439 C131.004877,67.7493854 129.984992,68.7870336 129.579467,70.7721666 C126.826347,70.331992 124.260925,69.2116615 121.883202,67.411175 L116.679923,106.399902 L137.717621,138.132197 L137.949363,138.794008 C137.979834,138.294551 138.014552,137.783722 138.053517,137.26152 L143.316842,137.237081 L142.89524,144.518416 C145.674256,144.491052 147.793828,144.299932 149.253954,143.945056 C151.444144,143.412741 154.832297,141.087178 157.209103,139.192463 C158.79364,137.929321 159.894811,136.568451 160.512616,135.109854 C160.134795,134.004944 160.313933,132.315796 161.05003,130.042411 C162.154175,126.632333 162.049905,124.358523 164.945004,123.715564 C167.840103,123.072605 169.262413,125.046861 169.840362,126.066111 C170.225662,126.745611 172.117062,126.843933 175.514562,126.361077 L186.770165,119.570239 C187.594301,118.656364 188.500953,118.421904 189.49012,118.866859 C190.973871,119.534292 190.378076,121.534807 189.040151,122.05259 C188.148201,122.397779 187.391539,122.952103 186.770165,123.715564 C188.243039,124.20029 188.758357,125.520964 188.316121,127.677587 C187.652767,130.912521 185.948238,130.74834 184.779848,130.912521 C184.000921,131.021975 183.238736,131.076702 182.493291,131.076702 C182.345256,133.226017 181.978312,134.694641 181.39246,135.482576 C180.806608,136.270511 180.005671,136.955025 178.98965,137.536118 C178.884785,139.451737 178.09702,140.84456 176.626356,141.714585 C174.42036,143.019623 169.12806,145.849713 167.260114,146.237476 C166.014817,146.495986 165.243113,146.876016 164.945004,147.377568 C159.912487,152.891071 155.256432,156.91598 150.976839,159.452293 C146.697246,161.988607 143.110054,163.72483 140.215263,164.660964 C140.664803,162.440556 140.397369,159.397906 139.41296,155.533015 C138.676298,152.640802 138.329051,151.246635 138.143479,150.113762 C130.605293,151.994796 126.677318,152.704872 126.359552,152.24399 C125.814631,151.453647 90.1545362,133.805066 90.1545362,131.295725 C90.1545362,129.622831 86.6735579,111.00504 79.7116015,75.4423519 L78.0885017,69.4361642 C76.5764887,72.0658295 75.3996107,73.2843458 72.5779344,71.7220732 C69.756258,70.1598007 67.3643028,69.1432615 65.3978032,67.8649327 C64.0868034,67.0127135 63.0296521,65.9458404 62.2263492,64.6643133 C59.1579495,59.8888647 57.1182885,55.1978421 56.1073663,50.5912456 C54.5909829,43.6813509 52.9883421,35.0290638 57.4304172,32.1268265 C61.8724924,29.2245891 72.7502738,24.9640312 89.0297247,24.0156543 C105.309176,23.0672774 115.063923,19.9697683 120.626714,19.5659433 C126.189506,19.1621183 129.394612,18.4329898 132.567086,17.1389141 C135.73956,15.8448385 138.590809,13.9735787 142.070231,14.7261616 C145.549652,15.4787446 149.888531,17.0420609 152.225512,18.7618624 C153.546101,19.7336938 153.518774,20.7963322 153.493295,21.416648 C153.467817,22.0369637 153.291721,22.4461511 153.025004,23.0938035 C152.601195,24.1229105 152.640098,24.4289957 153.373252,25.6702275 C154.119426,26.9335017 155.231255,25.8068753 155.196583,29.3260676 C155.18043,30.9656403 154.204273,31.184445 152.408049,32.3404786 C151.37457,33.0056167 151.449936,33.0108209 150.91064,34.0335474 C150.555613,34.7068237 157.158553,34.3143529 158.639888,35.0635939 C159.372266,35.4340216 159.794745,37.0581687 158.599351,38.3352194 C159.047982,39.0993907 159.106026,39.9746898 158.737979,40.4965078 C158.102158,41.3979758 155.75671,42.4401707 155.248869,44.5495445 C154.741029,46.6589184 156.389981,49.2812316 154.741029,51.5160359 C153.092077,53.7508403 150.365238,55.36767 148.537318,57.6315375 C147.530048,58.8790351 149.283804,59.7160709 147.065305,60.1721897 C146.530094,60.1323554 144.595165,59.7067699 142.934324,59.0267467 Z M83.6636638,58.9219645 L100.488279,60.6202898 L111.679595,57.0837862 C109.913473,55.1803356 107.957148,53.0525528 105.810619,50.7004378 C109.064859,49.4861034 111.543309,47.4358056 113.245969,44.5495445 C114.906706,41.7343484 115.925681,38.8856817 116.302894,36.0035445 C109.690961,36.9867391 101.772703,38.56794 97.1082645,40.4294586 C91.6328324,42.6146346 87.0415324,45.0876379 83.3343643,47.8484686 C84.8210227,51.339684 85.2145741,54.2736522 84.5150187,56.6503732 C84.3194377,57.3148544 84.0242133,58.0876245 83.6636638,58.9219645 Z').addClass('skin'))
		people2.add(draw.path('M138.251507,137.211069 C138.690004,141.038569 138.690004,144.01219 138.251507,146.131931 C137.593762,149.311543 140.502118,155.057892 140.417478,161.062239 C140.361051,165.065138 140.332838,167.687621 140.332838,168.929689 C144.373807,175.946318 147.160812,182.781771 148.693851,189.436046 C150.22689,196.09032 151.406073,202.898919 152.231399,209.861841 C144.908553,202.021678 133.02617,195.77251 116.58425,191.114336 C100.14233,186.456162 86.9907353,185.040476 77.1294658,186.867279 L75.8547656,190.701577 L68.221041,188.567211 C74.0713837,159.081186 77.1512187,142.6073 77.4605459,139.145554 C77.7698732,135.683809 77.7698732,131.706064 77.4605459,127.212321 C74.4624511,111.284348 72.7295387,99.8548761 72.2618087,92.9239063 C71.7940787,85.9929366 71.5602137,81.1582537 71.5602137,78.4198578 C67.6579316,73.091951 64.9450297,69.1216849 63.4215081,66.5090594 C65.04027,67.5793631 67.2274659,68.7708814 69.9830959,70.0836144 C73.5083311,72.5323204 75.6581177,72.9860747 76.4324556,71.4448772 C77.5939624,69.133081 81.4426014,62.2966771 83.4168571,59.2873649 C85.3911127,56.2780528 83.9382331,48.7984502 83.2866064,47.8011248 C84.0419391,46.8868567 85.445059,46.0084661 87.4959659,45.1659529 C90.4999648,48.0699456 93.5500671,49.4583332 96.6462728,49.3311156 C99.7424785,49.203898 101.809418,49.9248265 102.84709,51.4939012 L106.001185,50.4565752 C109.583984,54.5910939 113.74882,58.883071 118.495694,63.3325065 C123.242568,67.7819421 126.903167,70.2721963 129.477491,70.8032693 L129.901799,69.8488511 C131.865799,73.6049161 133.571488,76.4619184 135.018868,78.4198578 C137.189937,81.356767 144.297665,86.7023497 145.432658,89.098786 C146.18932,90.6964102 146.567651,106.733838 146.567651,137.211069 L138.251507,137.211069 Z').addClass('cloth'))
		people2.add(draw.path('M114.098262,85.8863347 L128.781856,92.7105534 C128.081335,106.799095 128.081335,118.661074 128.781856,128.296491 C129.482377,137.931908 129.482377,144.754824 128.781856,148.765241 L114.098262,142.991803 C114.400345,131.353783 114.400345,122.798444 114.098262,117.325788 C113.796179,111.853132 113.796179,101.373314 114.098262,85.8863347 Z').addClass('logo'));

		people3.attr({"id":"people3","width":113,"height":435, "x":-58, "y":-30})
		people3.add(draw.path('M84.8376854,212.814548 C69.4865189,214.120961 41.1128203,213.729074 32.1390823,212.225304 C23.1653443,210.721535 15.8624617,210.701982 15.8624617,210.701982 C15.8624617,210.701982 16.4925875,194.985276 17.343124,188.458274 C18.1936606,181.931273 18.562493,179.412547 20.400434,161.319316 C22.238375,143.226084 20.7159413,122.745663 20.7159413,122.745663 C17.5958261,118.459207 14.102731,116.153338 10.2366559,115.828055 C6.47616551,115.511655 3.90989152,115.098977 2.5378339,114.590022 C3.19106728,111.366959 4.30864045,105.848928 5.91020677,91.399348 C7.49241882,77.0062182 14.1351705,74.1895369 24.2482897,72.3453746 C34.3614089,70.5012124 44.7481332,65.0129518 60.0585557,65.2975027 C72.5906704,65.5304174 80.7562501,70.4611114 90.4759338,71.9640996 C101.677775,73.696279 108.755803,76.2194485 110.854149,90.255523 C111.568597,95.0345473 112.77656,103.155823 114.478039,114.619351 C106.164348,114.574024 100.615716,116.405003 97.8321415,120.112288 C93.6567804,125.673215 94.8610405,149.985939 97.3362174,165.263601 C99.8113942,180.541264 101.737322,209.150219 101.737322,209.150219 C101.737322,209.150219 100.243689,211.577487 84.8376854,212.814548 Z').addClass('cloth'))
		people3.add(draw.rect(45.4680501, 13.5881896).x(36.142126).y(99.1799891).addClass('logo'))
		var people3_part1 = draw.group().addClass('hair').translate(2.000000, 0.000000)
		people3_part1.add(draw.path('M19.0207835,404.584095 C20.4612014,402.686472 21.0075014,397.134631 21.0086996,393.080231 C21.0099004,389.016915 21.1275723,385.92717 20.7947343,380.87461 C20.1534518,371.139787 18.9050881,348.646882 19.0776637,340.139065 C19.2179822,331.644151 16.7642399,326.667349 17.2148377,319.165386 C17.6654354,311.663422 15.8843746,296.046257 14.4205985,276.778982 C12.9568225,257.511708 12.3382505,238.75369 12.0902884,227.337659 C11.8423264,215.921628 14.0100871,207.059072 14.0100871,207.059072 L98.9987681,203.523525 C98.9609667,208.148674 103.161687,218.317706 102.599106,227.694049 C102.036525,237.070392 102.969716,264.321333 102.501343,280.856581 C102.03297,297.391828 99.4796755,319.670107 100.124818,327.974704 C100.765122,336.293817 96.4391597,368.864448 95.3566587,377.400031 C94.2741577,385.935613 93.6120367,401.492788 93.6249237,406.113415 C94.3496978,406.777626 99.7836456,413.789302 100.919567,414.872013 C103.742066,417.560645 108.163531,419.767942 110.008639,422.372705 C111.818264,424.937146 112.715998,426.282972 112.522456,428.613549 C112.332138,430.981222 108.172582,433.466634 103.14047,434.094035 C98.7389854,434.614987 92.0004717,433.537599 88.1554223,431.382823 C84.3248885,429.205467 80.9153103,425.324935 78.112166,422.641142 C75.3783745,419.978316 69.1624263,418.133209 69.1624263,416.534868 C69.1624263,415.509547 69.403242,414.496369 69.5733969,413.908453 C69.5737802,413.553835 71.1536954,400.57604 71.7251635,390.472697 C72.2966316,380.369354 71.3629967,362.68406 71.4749796,355.187429 C71.5276868,351.658974 72.9529756,338.736985 72.9529756,333.308111 C72.9529756,327.855043 70.8512807,311.862938 69.1615558,300.225173 C67.4718308,288.587407 62.5920006,250.736858 61.9662123,247.046643 C61.3388112,243.341912 59.3062928,240.095208 57.2176439,240.391974 C55.1306078,240.722609 54.0415851,242.975509 53.7319167,246.512503 C53.4012812,250.044658 47.6892858,308.615 46.5499045,317.990454 C44.9999496,323.928991 45.1160289,336.774446 45.2224774,343.338771 C45.3773116,349.903096 43.4597107,366.786972 43.4597107,379.754337 C43.4597107,391.569927 43.5117971,407.947695 43.3807659,411.145821 C43.3949499,411.146125 42.9868972,416.913699 42.9868972,417.765287 C42.9868972,418.652358 37.2241616,420.13296 33.2565351,422.061936 C29.3050371,423.978009 28.8711787,427.703708 24.1003498,430.506852 C19.2617808,433.274513 11.8829631,433.797079 9.44593725,433.479346 C5.9105562,433.063229 3.35417894,432.648725 1.87357684,431.253604 C0.360717609,429.845581 0.549421799,425.808601 1.87357684,422.618372 C3.16386189,419.386208 6.66053439,416.476615 9.0265946,414.349257 C10.8515897,412.702218 16.1367804,408.383514 19.0207835,404.584095 Z'))
		people3_part1.add(draw.path('M75.0904213,34.8599993 C75.9427353,34.8564443 75.2068479,30.0389592 76.4164406,29.5768077 C77.6260333,29.1146562 78.7476022,29.5747612 78.9871583,28.3041135 C79.2104934,27.1195051 79.1040294,24.8855255 79.0191535,22.4325675 C78.861851,17.8864438 77.746011,10.5407704 72.2655253,5.59736575 C66.0818341,0.0184957472 61.6235981,-0.00533251739 55.1459226,0.10131783 C48.6682471,0.207968178 40.6276606,3.75645767 37.2406623,10.117563 C34.7826693,14.7319449 34.2317175,20.4417105 34.2317175,22.3577838 C34.2317175,24.2915985 34.1043018,25.7318792 34.2317175,27.1286128 C34.4317117,29.3237102 36.4639106,27.7785938 37.5735558,29.4414487 C37.8041942,29.7882128 38.1898504,34.8417799 38.1898504,34.8417799 L39.8815916,34.8933275 C39.8815916,34.8933275 39.7944589,30.1849755 39.9009074,28.4366392 C40.0847731,25.4044693 39.8418308,24.8219418 39.9393605,23.6599353 C41.1796152,23.3484274 45.0225827,18.5913775 43.81299,14.5062248 C47.1121182,14.6915094 49.6791151,14.4852913 55.1934709,14.5239999 C60.5868624,14.5627084 67.2760665,14.5315543 69.9929841,14.6861973 C69.1104525,18.1114509 71.383438,22.777848 73.2324833,24.0269902 C73.4129053,26.3457465 73.4173439,34.8742193 73.4173439,34.8742193 L75.0904213,34.8599993 Z'))
		people3.add(people3_part1)
		var people3_part2 = draw.group().addClass('skin').translate(3.000000, 14.000000)
		people3_part2.add(draw.path('M33.5441401,14.0459619 C34.1995709,14.8379656 35.6834033,14.1075138 36.5735558,15.4414487 C36.8041942,15.7882128 37.1898504,20.8417799 37.1898504,20.8417799 L38.8815916,20.8933275 C38.8815916,20.8933275 38.7944589,16.1849755 38.9009074,14.4366392 C39.0847731,11.4044693 38.8418308,10.8219418 38.9393605,9.65993527 C40.1796152,9.34842738 44.0225827,4.59137749 42.81299,0.506224798 C46.1121182,0.691509388 48.6791151,0.485291305 54.1934709,0.523999856 C59.5868624,0.562708408 66.2760665,0.531554256 68.9929841,0.68619726 C68.1104525,4.11145093 70.383438,8.77784802 72.2324833,10.0269902 C72.4129053,12.3457465 72.4173439,20.8742193 72.4173439,20.8742193 L74.0904213,20.8599993 C74.9427353,20.8564443 74.2068479,16.0389592 75.4164406,15.5768077 C75.5061653,15.5425264 75.5954057,15.5133196 75.6838377,15.4881046 L75.6904229,15.5103086 C75.6904229,15.5103086 75.6959017,15.5000471 75.7066714,15.4816769 C76.5911893,15.2358743 77.3917695,15.3813447 77.7825647,14.8293125 C78.0575328,15.0086238 78.3542159,15.2961669 78.6692813,15.7301176 C80.4534527,18.1875193 77.7865544,25.6440981 76.2221002,28.2926398 C74.6626264,30.9327499 73.1904956,29.3776473 73.1904956,29.3776473 C73.1904956,29.3776473 73.2345573,32.541323 72.172942,35.4151055 C70.9587409,38.7019362 68.8007221,40.8819991 68.8007221,40.8819991 C68.8007221,40.8819991 67.873326,50.2305472 69.5401408,52.2252965 C70.0921183,52.8858718 70.9189857,53.4105742 72.020743,53.7994036 C70.8653643,56.470106 68.7860827,57.9399663 65.1635701,59.6020712 C61.5410574,61.2641761 57.2833151,61.5313986 49.6416019,60.0878922 C41.9144073,58.5556787 38.9235851,53.5554409 38.9235851,53.5554409 C38.9235851,53.5554409 42.1402072,52.3429561 42.7853497,50.4462371 C43.4111379,48.5124224 43.1853381,41.0287691 43.1853381,41.0287691 C43.1853381,41.0287691 41.3560867,38.7448819 39.5690419,35.454655 C38.2916597,33.1014976 38.2659903,29.929827 38.0643833,28.4508378 C37.7207867,29.2948614 36.5841884,29.5287869 35.3080118,27.8460167 C32.7246623,24.4396043 31.275211,16.4259178 32.862419,14.6055535 C33.0833663,14.3521497 33.3128236,14.1706558 33.5441401,14.0459619 Z'))
		people3_part2.add(draw.path('M1.1851374,99.9647841 C3.99537406,99.4504924 7.17177692,99.4054623 10.714346,99.8296936 C14.256915,100.253925 17.0437479,101.870567 19.0748445,104.679618 C17.3038562,116.545062 16.3795532,124.199594 16.3019354,127.643216 C16.0878264,137.142464 16.1225939,148.262597 16.0593059,151.851067 C15.9749855,156.632086 15.9233267,176.21445 18.328292,186.24847 C19.3063533,190.329147 22.660518,188.368146 23.9336566,191.694304 C24.6606564,193.272729 31.8750301,199.123961 32.3732541,200.212556 C33.0051574,201.593234 31.956294,203.951573 29.8967441,203.595149 C27.6506531,203.206443 21.5501572,197.789377 21.3457609,198.394561 C20.7911263,200.036743 20.5973273,201.524977 20.7643637,202.859262 C15.6232245,204.549078 11.9837814,205.012414 9.84603439,204.249272 C6.63941393,203.104558 4.24777988,198.150649 5.18719169,190.422943 C6.12660351,182.695236 5.09298389,176.801027 3.29059301,165.995569 C1.48820213,155.190112 1.17358361,144.453088 0.823414966,132.633563 C0.589969205,124.75388 0.710543348,113.864287 1.1851374,99.9647841 Z'))
		people3_part2.add(draw.path('M78.9563485,99.9647841 C81.7665851,99.4504924 84.942988,99.4054623 88.485557,99.8296936 C92.0281261,100.253925 94.8149589,101.870567 96.8460556,104.679618 C95.0750673,116.545062 94.1507643,124.199594 94.0731465,127.643216 C93.8590375,137.142464 93.893805,148.262597 93.830517,151.851067 C93.7461966,156.632086 93.6945378,176.21445 96.0995031,186.24847 C97.0775644,190.329147 100.431729,188.368146 101.704868,191.694304 C102.431868,193.272729 109.646241,199.123961 110.144465,200.212556 C110.776368,201.593234 109.727505,203.951573 107.667955,203.595149 C105.421864,203.206443 99.3213683,197.789377 99.1169719,198.394561 C98.5623374,200.036743 98.3685384,201.524977 98.5355748,202.859262 C93.3944355,204.549078 89.7549924,205.012414 87.6172455,204.249272 C84.410625,203.104558 82.018991,198.150649 82.9584028,190.422943 C83.8978146,182.695236 82.864195,176.801027 81.0618041,165.995569 C79.2594132,155.190112 78.9447947,144.453088 78.594626,132.633563 C78.3611803,124.75388 78.4817544,113.864287 78.9563485,99.9647841 Z').transform({scaleX:-1}))
		people3.add(people3_part2)

		draw.defs().add(circle1)
		draw.defs().add(circle2)
		draw.defs().add(circle3)
		draw.defs().add(circle4)
		draw.defs().add(circle5)
		draw.defs().add(circle6)
		draw.defs().add(circle7)
		draw.defs().add(circle8)
		draw.defs().add(circle9)
		draw.defs().add(circle10)
		draw.defs().add(circle11)
		draw.defs().add(circle12)

		draw.defs().add(triangle1)
		draw.defs().add(triangle2)
		draw.defs().add(triangle3)
		draw.defs().add(triangle4)
		draw.defs().add(triangle5)
		draw.defs().add(triangle6)
		draw.defs().add(triangle7)
		draw.defs().add(triangle8)
		draw.defs().add(triangle9)
		draw.defs().add(triangle10)
		draw.defs().add(triangle11)
		draw.defs().add(triangle12)

		draw.defs().add(rectangle1)
		draw.defs().add(rectangle2)
		draw.defs().add(rectangle3)
		draw.defs().add(rectangle4)
		draw.defs().add(rectangle5)
		draw.defs().add(rectangle6)
		draw.defs().add(rectangle7)
		draw.defs().add(rectangle8)
		draw.defs().add(rectangle9)
		draw.defs().add(rectangle10)
		draw.defs().add(rectangle11)
		draw.defs().add(rectangle12)

		draw.defs().add(people1)
		draw.defs().add(people2)
		draw.defs().add(people3)


		var numOfElementsInShape = 12;
		var numOfPeopleFeatures = 28;
		var numOfTextFeatures =10;

		var area = width*height;	

		var circleList = [circle1,circle2,circle3,circle4,circle5,circle6,circle7,circle8,circle9,circle10,circle11,circle12]
		var rectList = [rectangle1,rectangle2,rectangle3,rectangle4,rectangle5,rectangle6,rectangle7,rectangle8,rectangle9,rectangle10,rectangle11,rectangle12]
		var triList = [triangle1,triangle2,triangle3,triangle4,triangle5,triangle6,triangle7,triangle8,triangle9,triangle10,triangle11,triangle12]
		var peopleList = [people1, people2, people3]
		var calQuadrant = function(x,y){
			if(x<=width/2 && y<=height/2){
				return 0
			}
			else if(x>width/2 && y<=height/2){
				return 1
			}
			else if(x<=width/2 && y>height/2){
				return 2
			}
			else if(x>width/2 && y>height/2){
				return 3
			}else{
				return 0
			}
		}


		var bgGradient = draw.gradient('linear', function(stop) {
			var bgHSV = csvdata[csvdata.length-1]
			stop.at(0, createRGBfromHSV(bgHSV.data[0],bgHSV.data[1],bgHSV.data[2]))
			stop.at(1, createRGBfromHSV(bgHSV.data[3],bgHSV.data[4],bgHSV.data[5]))	  
		})
		bgGradient.from("0%", "0%").to("0%", "100%")
		draw.rect(width, height).fill(bgGradient)

		for(var i=0; i <csvdata.length-1; i++){
			if(csvdata[i].name != "people" && csvdata[i].name != "text"){
				var shapeNormalComplexity = parseInt(numOfElementsInShape*csvdata[i].data[0])
				if(shapeNormalComplexity>0)
					shapeNormalComplexity -= 1;

				var elementColor = draw.gradient('linear', function(stop) {
					stop.at(0, createRGBfromHSV(csvdata[i].data[5],csvdata[i].data[6],csvdata[i].data[7]))
					stop.at(1, createRGBfromHSV(csvdata[i].data[8],csvdata[i].data[9],csvdata[i].data[10]))	  
				})
				elementColor.from("0%", "0%").to("0%", "100%")

				var shapeNormal;
				if(csvdata[i].name == "circle")
					shapeNormal = circleList[shapeNormalComplexity].clone()
				else if(csvdata[i].name == "rect")
					shapeNormal = rectList[shapeNormalComplexity].clone()
				else if(csvdata[i].name == "triangle")
					shapeNormal = triList[shapeNormalComplexity].clone()

				var shapeScale =(width*height)*csvdata[i].data[1]/(shapeNormal.width()*shapeNormal.height())

				draw.use(shapeNormal)

				shapeNormal
				.dx(parseInt(width*csvdata[i].data[2]))
				.dy(parseInt(height*csvdata[i].data[3]))
				.rotate(csvdata[i].data[4]*180-90)
				.scale(shapeScale,shapeScale)
				.fill(elementColor)
			}else if(csvdata[i].name == "people"){
				var people = peopleList[parseInt(peopleList.length*Math.random())].clone()
				var randomScale = (width*height)*csvdata[i].data[2]/(people.width()*people.height())


				var elementColor = draw.gradient('linear', function(stop) {
					stop.at(0, createRGBfromHSV(csvdata[i].data[5],csvdata[i].data[6],csvdata[i].data[7]))
					stop.at(1, createRGBfromHSV(csvdata[i].data[8],csvdata[i].data[9],csvdata[i].data[10]))	  
				})
				elementColor.from("0%", "0%").to("0%", "100%")

				var skinColor = createRGBfromHSV(csvdata[i].data[6],csvdata[i].data[7],csvdata[i].data[8])
				
				var peopleColor1 = draw.gradient('linear', function(stop) {
					stop.at(0, createRGBfromHSV(csvdata[i].data[9],csvdata[i].data[10],csvdata[i].data[11]))
					stop.at(1, createRGBfromHSV(csvdata[i].data[12],csvdata[i].data[13],csvdata[i].data[14]))	  
				})
				peopleColor1.from("0%", "0%").to("0%", "100%")

				var peopleColor2 = draw.gradient('linear', function(stop) {
					stop.at(0, createRGBfromHSV(csvdata[i].data[15],csvdata[i].data[16],csvdata[i].data[17]))
					stop.at(1, createRGBfromHSV(csvdata[i].data[18],csvdata[i].data[19],csvdata[i].data[20]))	  
				})
				peopleColor2.from("0%", "0%").to("0%", "100%")

				var peopleColor3 = draw.gradient('linear', function(stop) {
					stop.at(0, createRGBfromHSV(csvdata[i].data[21],csvdata[i].data[22],csvdata[i].data[23]))
					stop.at(1, createRGBfromHSV(csvdata[i].data[24],csvdata[i].data[25],csvdata[i].data[26]))	  
				})
				peopleColor3.from("0%", "0%").to("0%", "100%")

				
				var peopleX = csvdata[i].data[3]*width
				var peopleY = csvdata[i].data[4]*height

				draw.use(people)
				people.scale(randomScale,randomScale)
				.translate(peopleX, peopleY)


				var parts = people.children();
				for(var part in parts){
					if(parts[part].hasClass('skin')){
						parts[part].fill(skinColor)
					}
					else if(parts[part].hasClass('hair')){
						parts[part].fill(peopleColor1)
					}
					else if(parts[part].hasClass('logo')){
						parts[part].fill(peopleColor2)
					}
					else if(parts[part].hasClass('cloth')){
						parts[part].fill(peopleColor3)
					}
				}
			}else if(csvdata[i].name == "text"){

				var text = draw.text("Design thinking is\nthe cognitive\nprocess from which\ndesign nconcept\nemerges.")
				// var textXMargin = width/widthSegments, textYMargin = height/heightSegments
				var textColor = draw.gradient('linear', function(stop) {
					stop.at(0, createRGBfromHSV(csvdata[i].data[3],csvdata[i].data[4],csvdata[i].data[5]))
					stop.at(1, createRGBfromHSV(csvdata[i].data[6],csvdata[i].data[7],csvdata[i].data[8]))	  
				})
				textColor.from("0%", "0%").to("0%", "100%")
				
				text.dx(csvdata[i].data[1]*width).dy(csvdata[i].data[2]*height)
				var font_family = ['DINPro-Bold', 'DINPro-Light', 'Gotham-Bold', 'Gotham-Light']
				text.font({
					family:font_family[parseInt(font_family.length*Math.random())],
					size:10,
					anchor:'left',
					leading:'1.0em'
					//weight: font_weight[parseInt(font_weight.length*Math.random())],
				}).fill(textColor)

			}
		}
}


var compare = function(prop){
	return function(a,b){
		var val1 = a[prop];
		var val2 = b[prop];
		return val1-val2;
	}
}

$.get("js/positive.csv",function(data){
	var features = csv2array(data)
	// for (var i = 0; i < 100; i++){
	for (var i = 0; i < features.length; i+=10){
		console.log(features[i])
		var circle1 = {"data":features[i].slice(0,12),"index":features[i].slice(11,12),"name":"circle"},
			circle2 = {"data":features[i].slice(12,24),"index":features[i].slice(23,24),"name":"circle"},
			circle3 = {"data":features[i].slice(24,36),"index":features[i].slice(35,36),"name":"circle"},
			circle4 = {"data":features[i].slice(36,48),"index":features[i].slice(47,48),"name":"circle"},
			circle5 = {"data":features[i].slice(48,60),"index":features[i].slice(59,60),"name":"circle"},
			circle6 = {"data":features[i].slice(60,72),"index":features[i].slice(71,72),"name":"circle"},
			rect1 = {"data":features[i].slice(72,84),"index":features[i].slice(83,84),"name":"rect"},
			rect2 = {"data":features[i].slice(84,96),"index":features[i].slice(95,96),"name":"rect"},
			rect3 = {"data":features[i].slice(96,108),"index":features[i].slice(107,108),"name":"rect"},
			rect4 = {"data":features[i].slice(108,120),"index":features[i].slice(119,120),"name":"rect"},
			rect5 = {"data":features[i].slice(120,132),"index":features[i].slice(131,132),"name":"rect"},
			rect6 = {"data":features[i].slice(132,144),"index":features[i].slice(143,144),"name":"rect"},
			triangle1 = {"data":features[i].slice(144,156),"index":features[i].slice(155,156),"name":"triangle"},
			triangle2 = {"data":features[i].slice(156,168),"index":features[i].slice(167,168),"name":"triangle"},
			triangle3 = {"data":features[i].slice(168,180),"index":features[i].slice(179,180),"name":"triangle"},
			triangle4 = {"data":features[i].slice(180,192),"index":features[i].slice(191,192),"name":"triangle"},
			triangle5 = {"data":features[i].slice(192,204),"index":features[i].slice(203,204),"name":"triangle"},
			triangle6 = {"data":features[i].slice(204,216),"index":features[i].slice(215,216),"name":"triangle"},
			people = {"data":features[i].slice(216,244),"index":features[i].slice(243,244),"name":"people"},
			text = {"data":features[i].slice(244,254),"index":features[i].slice(253,254),"name":"text"},
			bg = {"data":features[i].slice(254,260),"name":"bg"};

		var poster = [circle1,circle2,circle3,circle4,circle5,circle6,rect1,rect2,rect3,rect4,rect5,rect6,triangle1,triangle2,triangle3,triangle4,triangle5,triangle6,text,people,bg]

		var sortedPoster = poster.sort(compare("index"))

		console.log(sortedPoster)
		createPoster(sortedPoster,i)

	}
})
