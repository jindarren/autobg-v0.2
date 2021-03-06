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

var posterIndex = 0

var backgroundPalette = [], elementPalettePure = []; elementPaletteGrad = []; 

//face_color/nose,ear_color/neck_color
var skinPalette = [[{r:252,g:234,b:202},{r:240,g:216,b:182},{r:230,g:203,b:159}],
					[{r:245,g:219,b:174},{r:232,g:202,b:160},{r:218,g:189,b:141}],
					[{r:228,g:196,b:142},{r:214,g:178,b:133},{r:204,g:166,b:113}]]

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
elementPalettePure.push(generateColor([[0,0,100]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[0,0,84]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[77,13,21]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[252,59,100]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[154,37,94]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[339,40,100]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[47,78,98]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[296,59,99]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[187,45,91]],colorRanNumber,colorRanRange))
elementPalettePure.push(generateColor([[347,78,100]],colorRanNumber,colorRanRange))

elementPaletteGrad.push(generateColor([[0,0,93],[0,0,47]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[51,19,100],[334,45,100]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[58,83,100],[326,80,95]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[24,49,100],[274,79,91]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[135,64,91],[62,81,96]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[135,64,91],[259,67,96]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[352,42,99],[183,75,95]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[319,86,89],[190,46,93]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[181,80,93],[259,67,96]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[207,86,89],[273,82,57]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[30,11,93],[23,44,74]],colorRanNumber,colorRanRange))
elementPaletteGrad.push(generateColor([[187,43,100],[325,21,100]],colorRanNumber,colorRanRange))


console.log("elementPaletteGrad",elementPaletteGrad)


console.log("BGPalette", backgroundPalette)
// console.log("ElePalette", elementPalette)

//Rotation

var tRotation_1 = [0,30,60,90,120,150,180],
	tRotation_2 = [0,36,72,108,144,180],
	tRotation_3 = [0,30,60,90,120,150,180],
	tRotation_4 = [0,180],
	tRotation_5 = [0,45,90,135,180],
	tRotation_6 = [0,60,90,150,180],
	tRotation_7 = [0,30,60,90,120,150,180],

	sRotation_1 = [0,30,60,90,120,150,180],
	sRotation_2 = [0,45,90,135,180],

	cRotation = [0,45,90,135,180];


//Layout

var width=1080/4, height=1314/4;

var widthSegments = 15, heightSegments = 20;

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

/**define the grid and important lines**/

// var lineStyle = { width: 0.5 ,color: '#FFFFFF'}
// draw.line(p0[0], p0[1], p2[0], p2[1]).stroke(lineStyle)
// draw.line(p1[0], p1[1], p3[0], p3[1]).stroke(lineStyle)


// draw.line(p0[0], p0[1], p5[0], p5[1]).stroke(lineStyle)
// draw.line(p1[0], p1[1], p4[0], p4[1]).stroke(lineStyle)
// draw.line(p2[0], p2[1], p6[0], p6[1]).stroke(lineStyle)
// draw.line(p3[0], p3[1], p7[0], p7[1]).stroke(lineStyle)


// draw.line(p8[0],p8[1],p10[0],p10[1]).stroke(lineStyle)
// draw.line(p9[0],p9[1],p11[0],p11[1]).stroke(lineStyle)
// draw.line(p12[0],p12[1],p14[0],p14[1]).stroke(lineStyle)
// draw.line(p13[0],p13[1],p15[0],p15[1]).stroke(lineStyle)


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


// ============================================

function loadxmlDoc(file){
    try{
        //IE
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    }catch(e){
        ////Firefox, Mozilla, Opera, etc
        xmlDoc=document.implementation.createDocument("","",null);
    }

    try{
        xmlDoc.async=false;
        xmlDoc.load(file);
    }catch(e){
        // for Chrome
        var xmlhttp = new window.XMLHttpRequest();  
        xmlhttp.open("GET",file,false);  
        xmlhttp.send(null);  
        xmlDoc = xmlhttp.responseXML.documentElement; 
    }
    return xmlDoc;
}

var ob=loadxmlDoc("js/all.xml");
var svg=ob.getElementsByTagName("svg");


//create all possible shapes in the canvas
function creareShapes (cList, rList, tList, pList, draw) {
	for(var i=0;i<svg.length;i++){
		var shape = draw.group()

		if(svg[i].getElementById('triangle')){
	    	data=svg[i].getElementById('triangle').childNodes[1]
	    	var transform = svg[i].getElementById('triangle').getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
	    	var point = svg[i].getElementById('point')
	    	var index = (parseInt(data.id.split("/")[1])+4) + (parseInt(data.id.split("/")[2])+4)*9

	    	// console.log(data.id)
	    	
	    	//check if the element has transform data
	    	if(svg[i].getElementById(data.id).getAttribute("transform")){
	    		var elementTransform = svg[i].getElementById(data.id).getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
	    		// console.log(elementTransform)
	    		transform[0] = parseFloat(transform[0])+parseFloat(elementTransform[0])
	    		transform[1] = parseFloat(transform[1])+parseFloat(elementTransform[1])

	    		if(svg[i].getElementById(data.id).getAttribute("transform").indexOf("scale")>0){
					var scaleValue = svg[i].getElementById(data.id).getAttribute("transform").match(/scale.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0].split(',')
					shape.scale(parseInt(scaleValue[0]),parseInt(scaleValue[1]))
				}
	    	}

	    	// set attributes of shape
	    	if(point){
	    		var cx = parseFloat(point.getAttribute("x"))
	    		var cy = parseFloat(point.getAttribute("y"))
	    		shape.attr({"name":data.id,"cx":cx, "cy":cy, "transform":"translate("+(parseFloat(transform[0])-cx)+","+(parseFloat(transform[1])-cy)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})
	    	}else{
				shape.attr({"name":data.id,"transform":"translate("+(parseFloat(transform[0])-parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0])/2)+","+(parseFloat(transform[1])-parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])/2)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})
	    	}

	    	// set content of shape
	    	if(svg[i].getElementsByTagName('path')[0]){
	    		shape.path(svg[i].getElementsByTagName('path')[0].getAttribute("d"))
	    	}
	    	else if(svg[i].getElementsByTagName('polygon')[0]){
	    		shape.add(draw.polygon().attr("points",svg[i].getElementsByTagName('polygon')[0].getAttribute("points")))
	    	}


	    	tList[index] = shape.clone()

	    	
		}else if(svg[i].getElementById('square')){
	    	data=svg[i].getElementById('square').childNodes[1]
	    	var transform = svg[i].getElementById('square').getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
	    	var point = svg[i].getElementById('point')
	    	var index = (parseInt(data.id.split("/")[1])+4) + (parseInt(data.id.split("/")[2])+4)*9


	    	//check if the element has transform data
	    	if(svg[i].getElementById(data.id).getAttribute("transform")){
	    		var elementTransform = svg[i].getElementById(data.id).getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
	    		console.log(elementTransform)
	    		transform[0] = parseFloat(transform[0])+parseFloat(elementTransform[0])
	    		transform[1] = parseFloat(transform[1])+parseFloat(elementTransform[1])

	    		if(svg[i].getElementById(data.id).getAttribute("transform").indexOf("scale")>0){
					var scaleValue = svg[i].getElementById(data.id).getAttribute("transform").match(/scale.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0].split(',')
					shape.scale(parseInt(scaleValue[0]),parseInt(scaleValue[1]))
				}
	    	}

	    	// set attributes of shape
	    	if(point){
	    		var cx = parseFloat(point.getAttribute("x"))
	    		var cy = parseFloat(point.getAttribute("y"))
	    		shape.attr({"name":data.id, "cx":cx, "cy":cy, "transform":"translate("+(parseFloat(transform[0])-cx)+","+(parseFloat(transform[1])-cy)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})
	    	}else{
				shape.attr({"name":data.id,"transform":"translate("+(parseFloat(transform[0])-parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0])/2)+","+(parseFloat(transform[1])-parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])/2)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})
	    	}

	    	// set content of shape
	    	if(svg[i].getElementsByTagName('path')[0]){
	    		shape.path(svg[i].getElementsByTagName('path')[0].getAttribute("d"))
	    	}
	    	else if(svg[i].getElementsByTagName('polygon')[0]){
	    		shape.add(draw.polygon().attr("points",svg[i].getElementsByTagName('polygon')[0].getAttribute("points")))
	    	}


	    	rList[index] = shape.clone()


		}else if(svg[i].getElementById('circular')){
	    	data=svg[i].getElementById('circular').childNodes[1]
	    	var transform = svg[i].getElementById('circular').getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
	    	var point = svg[i].getElementById('point')
	    	var index = (parseInt(data.id.split("/")[1])+4) + (parseInt(data.id.split("/")[2])+4)*9

	    	//check if the element has transform data
	    	if(svg[i].getElementById(data.id).getAttribute("transform")){
	    		var elementTransform = svg[i].getElementById(data.id).getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
	    		// console.log(elementTransform)
	    		transform[0] = parseFloat(transform[0])+parseFloat(elementTransform[0])
	    		transform[1] = parseFloat(transform[1])+parseFloat(elementTransform[1])

	    		if(svg[i].getElementById(data.id).getAttribute("transform").indexOf("scale")>0){
					var scaleValue = svg[i].getElementById(data.id).getAttribute("transform").match(/scale.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0].split(',')
					shape.scale(parseInt(scaleValue[0]),parseInt(scaleValue[1]))
				}
	    	}

			// set attributes of shape
	    	if(point){
	    		var cx = parseFloat(point.getAttribute("x"))
	    		var cy = parseFloat(point.getAttribute("y"))
	    		shape.attr({"name":data.id, "cx":cx, "cy":cy, "transform":"translate("+(parseFloat(transform[0])-cx)+","+(parseFloat(transform[1])-cy)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})
	    	}else{
				shape.attr({"name":data.id,"transform":"translate("+(parseFloat(transform[0])-parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0])/2)+","+(parseFloat(transform[1])-parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])/2)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})
	    	}

			// set content of shape
	    	if(svg[i].getElementsByTagName('path')[0]){
	    		shape.path(svg[i].getElementsByTagName('path')[0].getAttribute("d"))
	    	}
	    	else if(svg[i].getElementsByTagName('ellipse')[0]){
	    		shape.add(draw.ellipse().attr({"cx":svg[i].getElementsByTagName('ellipse')[0].getAttribute("cx"),"cy":svg[i].getElementsByTagName('ellipse')[0].getAttribute("cy"),"rx":svg[i].getElementsByTagName('ellipse')[0].getAttribute("rx"),"ry":svg[i].getElementsByTagName('ellipse')[0].getAttribute("ry")}))
	    	}
	    	else if(svg[i].getElementsByTagName('circle')[0]){
	    		shape.add(draw.circle().attr({"cx":svg[i].getElementsByTagName('circle')[0].getAttribute("cx"),"cy":svg[i].getElementsByTagName('circle')[0].getAttribute("cy"),"r":svg[i].getElementsByTagName('circle')[0].getAttribute("r")}))
	    	}

	    	cList[index] = shape.clone()

		}else if(svg[i].getElementById('people')){
			data=svg[i].getElementById('people').childNodes[1]
	    	var transform = svg[i].getElementById('people').getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
			shape.attr({"name":data.id,"transform":"translate("+(parseFloat(transform[0])+parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0])/2)+","+(parseFloat(transform[1])+parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])/2)+")","width":parseFloat(svg[i].getAttribute("width").match(/\d+/g)[0]),"height":parseFloat(svg[i].getAttribute("height").match(/\d+/g)[0])})

			var transformHead = svg[i].getElementById('head').getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
			var head = draw.group().translate(parseFloat(transformHead[0]), parseFloat(transformHead[1])).addClass("head")

			var headPaths = svg[i].getElementById('head').getElementsByTagName("path")

			// console.log(headPaths)
			for(var index = 0; index < headPaths.length; index++){
				var newPath = draw.path(headPaths[index].getAttribute("d"))
				if(headPaths[index].getAttribute("id")=="nose" || headPaths[index].getAttribute("id")=="ear" || headPaths[index].getAttribute("id")=="ear2")
					newPath.addClass("nose")
				if(headPaths[index].getAttribute("id")=="shadow")
					newPath.addClass("shadow")
				if(headPaths[index].getAttribute("id")=="face" || headPaths[index].getAttribute("id")=="neck")
					newPath.addClass("skin")

				if(headPaths[index].getAttribute("fill")){
					var color = headPaths[index].getAttribute("fill")
					newPath.fill(color)
				}

				if(headPaths[index].getAttribute("transform")){

					if(headPaths[index].getAttribute("transform").indexOf("scale")>0){
						var scaleValue = headPaths[index].getAttribute("transform").match(/scale.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0].split(',')
						newPath.scale(parseInt(scaleValue[0]),parseInt(scaleValue[1]))
					}

					if(headPaths[index].getAttribute("transform").indexOf("rotate")>0){
						var rotateValue = headPaths[index].getAttribute("transform").match(/rotate.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0]
						newPath.rotate(parseFloat(rotateValue))
					}

				}

				head.add(newPath)
			}

			var headCircles = svg[i].getElementById('head').getElementsByTagName("ellipse")
			for(var index = 0; index < headCircles.length; index++){
	    		var newCircle = draw.ellipse().attr({"cx":headCircles[index].getAttribute("cx"),"cy":headCircles[index].getAttribute("cy"),"rx":headCircles[index].getAttribute("rx"),"ry":headCircles[index].getAttribute("ry")})
	    		
	    		if(headCircles[index].getAttribute("fill")){
					var color = headCircles[index].getAttribute("fill")
					newCircle.fill(color)
				}
	    		
	    		if(headCircles[index].getAttribute("transform")){

		    		if(headCircles[index].getAttribute("transform").indexOf("scale")>0){
						var scaleValue = headCircles[index].getAttribute("transform").match(/scale.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0].split(',')
						newCircle.scale(parseInt(scaleValue[0]),parseInt(scaleValue[1]))
					}
					if(headCircles[index].getAttribute("transform").indexOf("rotate")>0){
						var rotateValue = headCircles[index].getAttribute("transform").match(/rotate.*?\)/g)[0].match(/[^\(]+(?=\))/g)[0]
						newCircle.rotate(parseFloat(rotateValue))
					}

	    		}

				head.add(newCircle)
			}


			var arm = svg[i].getElementById('arm')
			var newArm = draw.path(arm.getAttribute("d")).fill(arm.getAttribute("fill")).addClass("skin")


			var clothes = svg[i].getElementById('clothes')
			var newClothes = draw.path(clothes.getAttribute("d")).addClass("clothes")


			var pattern = svg[i].getElementById('pattern').getElementsByTagName("path")[0]
			var newPattern = draw.path(pattern.getAttribute("d")).addClass('logo')

			var transform = svg[i].getElementById('pattern').getAttribute("transform").match(/[^\(]+(?=\))/g)[0].split(',')
			var color = svg[i].getElementById('pattern').getAttribute("fill")

			newPattern.attr({"transform":"translate("+parseFloat(transform[0])+","+parseFloat(transform[1])+")"})
			newPattern.fill(color)

			shape.add(head)
			shape.add(newArm)
			shape.add(newClothes)
			shape.add(newPattern)
			
			pList.push(shape.clone())

		}
	}

}

//Store all parameters
var parametersList = []
var conditionList = []
//Store good poster index
var goodPostersIndex = []
// a list to save all rendered posters' original opacity values, then we can restore from the state of all transprency for inspecting the hidden elements
var drawList = []


var _draw = SVG('test').size(width, height)
var _circleList = [], _rectList = [], _triList = [], _peopleList = []
creareShapes(_circleList,_rectList,_triList,_peopleList,_draw)

//Define the number of deatures for each shape
const NUM_SHAPE_FEATURES=15,
	  MAX_ELEMENTS = 18,
	  NUM_PEOPLE_FEATURES = 17,
	  NUM_TEXT_FEATURES =1,
	  NUM_BG_FEATURES = 6,
	  NUM_ELEMENT_TYPE = 3,
	  NUM_ELEMENT_X = 9,
	  NUM_ELEMENT_Y = 9;

function createPoster(num){
	var div = document.createElement("div");
	div.setAttribute("id", "container");

	for(var index=0; index<num; index++){

		var subdiv = document.createElement("div");
		subdiv.setAttribute("id", "poster"+index);
		subdiv.setAttribute("class", "poster");
		div.appendChild(subdiv)
		document.body.appendChild(div);

		var draw = SVG('poster'+index).size(width, height)
		var circleList = _circleList.concat(), rectList = _rectList.concat(), triList = _triList.concat(), peopleList = _peopleList.concat()

		// define color
		var getRandomColor = function(list){
			var length = list.length
			var selectedIndex = parseInt(Math.random()*length)
			var color = {}
			
			var rgbIndex = parseInt(Math.random()*colorRanNumber*colorRanNumber*colorRanNumber)
			//check it is pure color or gradient color
			var containedColorNum = list[selectedIndex][rgbIndex].length
			if(containedColorNum==1){
				var pure = list[selectedIndex][rgbIndex][0]
				color.rgb = [pure]
				color.val = new SVG.Color(pure).toHex()
				return color
			}
			else if(containedColorNum>1){
				var rgbList = []
				var gradient = draw.gradient('linear', function(stop) {
					for(var index =0 ; index < containedColorNum ; index++){
						rgbList.push(list[selectedIndex][rgbIndex][index])
						stop.at(index, list[selectedIndex][rgbIndex][index])
					}		  
				})
				gradient.from("0%", "0%").to("0%", "100%")
				color.rgb = rgbList
				color.val = gradient
				return color
			}
		}

		//REC: a post's parameters
		var posterParameters = [];
		var conditionParameters = [];
		//set background color
		var randomBGColors = getRandomColor(backgroundPalette)
		draw.rect(width, height).fill(randomBGColors.val)


		function recordHSV(color){
			var HSVColorList=[]
			// also create a gradient pattern for pure color
			if(color.rgb.length==1){
				HSVColorList = rgb2hsv(color.rgb[0].r,color.rgb[0].g,color.rgb[0].b)
				HSVColorList = HSVColorList.concat(rgb2hsv(color.rgb[0].r,color.rgb[0].g,color.rgb[0].b))
			}else if(color.rgb.length==2){
				HSVColorList = rgb2hsv(color.rgb[0].r,color.rgb[0].g,color.rgb[0].b)
				HSVColorList = HSVColorList.concat(rgb2hsv(color.rgb[1].r,color.rgb[1].g,color.rgb[1].b))
			}
			return HSVColorList
		}

		var randomBGHSV = recordHSV(randomBGColors)


		/*
		*@totalNum 元素的总数量设定 2 到 10 个
		*/
		var totalNum = 2+parseInt(Math.random()*9)

		//分流的概率
		var randomNumDist = Math.random()

		//三类元素
		var numOfTypeA, numOfTypeB, numOfTypeC;

		if(randomNumDist<0.5){
			numOfTypeA = parseInt(Math.random()*totalNum), numOfTypeB = parseInt((totalNum-numOfTypeA)*Math.random()), numOfTypeC = totalNum-(numOfTypeA+numOfTypeB);
		}else if(randomNumDist>=0.5){
			numOfTypeA = totalNum, numOfTypeB = 0, numOfTypeC = 0;
		}

		var zIndex = 1;

		// REC:	all kinds of shapes
		
		var recShapeAtr = function(selectedShapeIndex, coor_X,coor_Y,coor_Z,shape,randomScale,intersection,randomInter,rotation,color,opacity,index){

			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES]=coor_X / (NUM_ELEMENT_TYPE-1)
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+1]=coor_Y / (NUM_ELEMENT_X-1)
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+2]=coor_Z / (NUM_ELEMENT_Y-1)
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+3]=shape.width()*randomScale*shape.height()*randomScale/(width*height)
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+4]=intersection[randomInter][0]/width
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+5]=intersection[randomInter][1]/height
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+6]=rotation
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+7]=recordHSV(color)[0]/360
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+8]=recordHSV(color)[1]
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+9]=recordHSV(color)[2]
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+10]=recordHSV(color)[3]/360
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+11]=recordHSV(color)[4]
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+12]=recordHSV(color)[5]
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+13]=opacity
			posterParameters[selectedShapeIndex*NUM_SHAPE_FEATURES+14]=index

			// console.log(intersection[randomInter][0],intersection[randomInter][1],randomScale,opacity)

		} 


		var area = width*height;	

		var numOfElementsInShapeX = 9;
		var numOfElementsInShapeY = 9;
		var shapeList = triList.concat(rectList,circleList)

		console.log(shapeList)

		//elementTypeList: which elements will be shown in the poster
		//lementList: a list of shapes that will be shown
		var numberOfCoreShapes, numberOfNormalShapes, elementTypeList=[], elementList=[];
		while(1){
			var elementIndex = parseInt(Math.random()*243)
			if(elementTypeList.indexOf(elementIndex)<0)
				elementTypeList.push(elementIndex)
			if(elementTypeList.length==3)
				break;
		}
		// console.log(elementTypeList)

		//randomize the elements in an array
		function randomsort(a, b) {
		   return Math.random()>.5 ? -1 : 1;
		}


		//fill the shape slots by the selected elements
		for(var i=0 ; i<numOfTypeA; i++){
			elementList.push(elementTypeList[0])
		}
		for(var i=0 ; i<numOfTypeB; i++){
			elementList.push(elementTypeList[1])
		}
		for(var i=0 ; i<numOfTypeC; i++){
			elementList.push(elementTypeList[2])
		}

		elementList.sort(randomsort);


		function rotate (shape){
			var randomRotation = Math.random()
			var shapeName = shape.node.attributes.name.nodeValue.split("/")
			var rotationAngel


			if(shapeName[0]=="t"){
		    	if(parseInt(shapeName[1])==-4){
		    		rotationAngel = tRotation_1[parseInt(tRotation_1.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])==-3){
		    		rotationAngel = tRotation_2[parseInt(tRotation_2.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])==-2||parseInt(shapeName[1])==-1||parseInt(shapeName[1])==0){
		    		rotationAngel = tRotation_3[parseInt(tRotation_3.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])==1){
		    		rotationAngel = tRotation_4[parseInt(tRotation_4.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])==2){
		    		rotationAngel = tRotation_5[parseInt(tRotation_5.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])==3){
		    		rotationAngel = tRotation_6[parseInt(tRotation_6.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])==4){
		    		rotationAngel = tRotation_7[parseInt(tRotation_7.length*randomRotation)]
		    	}
			}
			//
			else if(shapeName[0]=="s"){
		    	if(parseInt(shapeName[1])>=-4 && parseInt(shapeName[1])<=-1){
		    		rotationAngel = sRotation_1[parseInt(sRotation_1.length*randomRotation)]
		    	}else if(parseInt(shapeName[1])>=0 && parseInt(shapeName[1])<=4){
		    		rotationAngel = sRotation_2[parseInt(sRotation_2.length*randomRotation)]
		    	}
			}
			else if(shapeName[0]=="c"){
				rotationAngel = cRotation[parseInt(cRotation.length*randomRotation)]

			}

			if(shape.attr("cx") && shape.attr("cy")){
				shape
				.rotate(rotationAngel, shape.attr("cx"), shape.attr("cy"))
			}else{
				shape
				.rotate(rotationAngel)

			}

			return randomRotation;
		}

		for(var j=0 ;j<totalNum; j++){
			//to get a random coordinate for the selected shape
			var randomNormalInter = parseInt(Math.random()*normalIntersections.length)
			// to get a random shape
			var shape_X = parseInt(elementList[j]/81)
			var shape_Y = parseInt((elementList[j]%81)/9)
			var shape_Z = (elementList[j]%81)%9

			//console.log(shape_X,shape_Y,shape_Z,elementList[j])

			var elementNormalColorPure = getRandomColor(elementPalettePure)
			var elementNormalColorGrad = getRandomColor(elementPaletteGrad)

			// console.log(shape_X,shape_Y,shape_Z)
			var shapeNormal = shapeList[elementList[j]].clone()
			
			draw.use(shapeNormal)

			shapeNormal
			.dx(normalIntersections[randomNormalInter][0])
			.dy(normalIntersections[randomNormalInter][1])

			

			var randomScaleDist = Math.random()
			var randomNormalScale
			var color
			if (randomScaleDist<0.5){
				color = elementNormalColorPure
				randomNormalScale = 0.5+1.5*Math.random()
				shapeNormal
				.scale(randomNormalScale,randomNormalScale)
				.fill(color.val)
				// .opacity(Math.random())
			}else if (randomScaleDist>=0.5){
				color = elementNormalColorGrad
				randomNormalScale = 1+7*Math.random()
				shapeNormal
				.scale(randomNormalScale,randomNormalScale)
				.fill(color.val)
				// .opacity(Math.random())
			}

			var rotation = rotate(shapeNormal)

			// console.log("rotation", rotation)

			var randomOpacityDist = Math.random()
			var opacityOfElement = Math.random()

			if (randomOpacityDist<0.5)
				shapeNormal.opacity(opacityOfElement)
			else{
				opacityOfElement = 1
			}

			var nomalizedZIndex =  zIndex/totalNum

			recShapeAtr(j, shape_X,shape_Y,shape_Z,shapeNormal,randomNormalScale,normalIntersections,randomNormalInter,rotation,color,opacityOfElement,nomalizedZIndex)

			zIndex++

		}


		// draw for people

		var randomScale = 1.2+0.6*Math.random()
		var peopleWidth = peopleList[0].width()*randomScale
		var randomX = Math.random()
		var peopleX = -peopleWidth/5+randomX*(width-peopleWidth*3/5)
		var numOfPeople = 5,
			numOfSkinColor = 3;

		var peopleIndex

		if(peopleX>= -peopleWidth/5 && peopleX<0.45*width-peopleWidth/2){
			peopleIndex = parseInt(2*Math.random())
		}else if(peopleX >=0.45*width-peopleWidth/2 && peopleX<0.55*width-peopleWidth/2){
			peopleIndex = 2
		}else if(peopleX >= 0.55*width-peopleWidth/2){
			peopleIndex = parseInt(3+2*Math.random())
		}

		var people = peopleList[peopleIndex].clone()


		var skinColorIndex = parseInt(skinPalette.length*Math.random())

		var skinColor = skinPalette[skinColorIndex][0]
			noseColor =	skinPalette[skinColorIndex][1]
			shadowColor = skinPalette[skinColorIndex][2];


		var peopleColor1 = getRandomColor(elementPalettePure), peopleColor2 = getRandomColor(elementPalettePure);
		
		var peopleY = height-randomScale*people.height()

		draw.use(people)
		people.scale(randomScale,randomScale)
		.translate(peopleX, peopleY)

		var parts = people.children();
		for(var part in parts){
			if(parts[part].hasClass('head')){
				var headParts = parts[part].children()
				for(var headPart in headParts){
					if(headParts[headPart].hasClass("skin"))
						headParts[headPart].fill(skinColor)
					else if(headParts[headPart].hasClass("nose"))
						headParts[headPart].fill(noseColor)
					else if(headParts[headPart].hasClass("shadow"))
						headParts[headPart].fill(shadowColor)
				}
			}

			else if(parts[part].hasClass('skin')){
				parts[part].fill(skinColor)
			}
			else if(parts[part].hasClass('clothes')){
				parts[part].fill(peopleColor1.val)
			}
			else if(parts[part].hasClass('logo')){
				parts[part].fill(peopleColor2.val)
			}
		}

		// //REC: people
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES]=peopleIndex/(numOfPeople-1)
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+1]=people.width()*randomScale*people.height()*randomScale/(width*height)
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+2]=peopleX/width
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+3]=peopleY/height
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+4]=skinColorIndex/(numOfSkinColor-1)

		//Parameters for condition
		conditionParameters[0] = peopleX/width
		conditionParameters[1] = peopleY/height
		conditionParameters[2] = people.width()*randomScale*people.height()*randomScale/(width*height)
		conditionParameters[3] = skinColorIndex/numOfSkinColor
		conditionParameters[4] = peopleIndex/(numOfPeople-1)

		//main color on clothes
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+5]=recordHSV(peopleColor1)[0]/360
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+6]=recordHSV(peopleColor1)[1]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+7]=recordHSV(peopleColor1)[2]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+8]=recordHSV(peopleColor1)[3]/360
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+9]=recordHSV(peopleColor1)[4]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+10]=recordHSV(peopleColor1)[5]

		//Parameters for condition
		conditionParameters[5] = recordHSV(peopleColor1)[0]/360
		conditionParameters[6] = recordHSV(peopleColor1)[1]
		conditionParameters[7] = recordHSV(peopleColor1)[2]

		//color for the logo on clothes
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+11]=recordHSV(peopleColor2)[0]/360
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+12]=recordHSV(peopleColor2)[1]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+13]=recordHSV(peopleColor2)[2]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+14]=recordHSV(peopleColor2)[3]/360
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+15]=recordHSV(peopleColor2)[4]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+16]=recordHSV(peopleColor2)[5]

		//text on poster
		function convertNumToText(num){
			if(num<=9)
				return "0000"+num
			else if (num>9&&num<100)
				return "000"+num
			else if (num>=100&&num<1000)
				return "00"+num
			else if (num>=1000&&num<10000)
				return "0"+num
			else if (num>=10000&&num<100000)
				return num.toString()
		}

        var logo = draw.group()
		logo.add(draw.polygon().attr("points","9.97729075 0 9.97729075 9.48940367 0.878099164 9.48940367 0.878099164 0 0.0975774157 0 0.0975774157 10.2701206 10.7578125 10.2701206 10.7578125 0"))
		logo.add(draw.polygon().attr("points","0 23.0041685 0.55199544 23.5560663 5.34265624 18.7655031 10.133317 23.5560663 10.6854101 23.0041685 5.34265624 17.6615122"))
		logo.add(draw.polygon().attr("points","0 13.4321167 2.01965735 15.4516765 2.57165279 14.8997786 0.55199544 12.8802189"))
		logo.add(draw.polygon().attr("points","8.0989255 14.9101218 8.65082336 15.4621173 10.6808239 13.4322143 10.1288285 12.8802189"))
		logo.add(draw.path("M5.1907282,26.05317 L0,26.05317 L0,26.8337893 L5.1907282,26.8337893 C7.77291935,26.8337893 9.87366354,28.9345335 9.87366354,31.5167246 C9.87366354,34.0989158 7.77291935,36.19966 5.1907282,36.19966 L0,36.19966 L0,36.9802793 L5.1907282,36.9802793 C8.20333334,36.9802793 10.6542829,34.5293298 10.6542829,31.5167246 C10.6542829,28.5041195 8.20333334,26.05317 5.1907282,26.05317"))
		
		if(randomX>=0.25)
			logo.dx(10).dy(11).fill('#fff')
		else if(randomX<0.25)
			logo.dx(249).dy(11).fill('#fff')


		//===============

		var slogan = draw.text("born and raised.\nain't afraid of dying")
		slogan.font({
			family:'Gotham-Book',
			size:5,
			anchor:'left',
			leading:'1em'
		}).fill("#fff")

		if(randomX>=0.25)
			slogan.dx(10).dy(56).rotate(-270,10+5,56+5)
		else if(randomX<0.25)
			slogan.dx(249).dy(56).rotate(-270,249+5,56+5)

		//===============

		if(randomX>=0.25)
			draw.line(18, 107, 18, 111).stroke({width: 1, color: "#fff"})
		else if(randomX<0.25)
			draw.line(257, 107, 257, 111).stroke({width: 1, color: "#fff"})

		//===============

		var brand = draw.text("GAN based")
		brand.font({
			family:'Gotham-Book',
			size:10,
			anchor:'left',
			leading:'1em'
		}).fill("#fff")

		if(randomX>=0.25)
			brand.dx(10).dy(148).rotate(-270,10+5,148+5)
		else if(randomX<0.25)
			brand.dx(250).dy(148).rotate(-270,250+5,148+5)

		//===============


		if(randomX>=0.25)
			draw.line(0, 254.5, 16, 254.5).stroke({width: 1, color: "#fff"})
		else if(randomX<0.25)
			draw.line(254, 254.5, 270, 254.5).stroke({width: 1, color: "#fff"})

		//===============

		var posterNum = draw.text("No. "+convertNumToText(posterIndex))
		posterNum.font({
			family:'Gotham-Book',
			size:8,
			anchor:'left',
			leading:'1em'
		}).fill("#fff")

		posterIndex++

		if(randomX>=0.25)
			posterNum.dx(8).dy(261).rotate(-270,8+4,261+4)
		else if(randomX<0.25)
			posterNum.dx(252).dy(261).rotate(-270,252+4,261+4)

		//===============

		var designby = draw.text("Design by UXD")
		designby.font({
			family:'Gotham-Book',
			size:5,
			anchor:'left',
			leading:'1em'
		}).fill("#fff")

		if(randomX>=0.25)
			designby.dx(249).dy(12).rotate(-270,249+2.5,12+2.5)
		else if(randomX<0.25)
			designby.dx(10).dy(12).rotate(-270,10+2.5,12+2.5)

		//===============

		if(randomX>=0.25)
			draw.line(256.9, 12, 256.9, 21).stroke({width: 2, color: "#fff"})
		else if(randomX<0.25)
			draw.line(18, 12, 18, 21).stroke({width: 2, color: "#fff"})

		//===============

		var millionDesign = draw.text("Written in Water")
		millionDesign.font({
			family:'Gotham-Book',
			size:5,
			anchor:'left',
			leading:'1em'
		}).fill("#fff")

		if(randomX>=0.25)
			millionDesign.dx(254.5).dy(151).rotate(-270,254.5+2.5,151+2.5)
		else if(randomX<0.25)
			millionDesign.dx(10).dy(151).rotate(-270,10+2.5,151+2.5)


		//===============

		//REC: text
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES] = randomX
		
		//REC: background HSV
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES+NUM_TEXT_FEATURES] = randomBGHSV[0]/360
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES+NUM_TEXT_FEATURES+1] = randomBGHSV[1]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES+NUM_TEXT_FEATURES+2] = randomBGHSV[2]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES+NUM_TEXT_FEATURES+3] = randomBGHSV[3]/360
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES+NUM_TEXT_FEATURES+4] = randomBGHSV[4]
		posterParameters[MAX_ELEMENTS*NUM_SHAPE_FEATURES+NUM_PEOPLE_FEATURES+NUM_TEXT_FEATURES+5] = randomBGHSV[5]

		conditionParameters[8] = 0.5
		conditionParameters[9] = 0.5
		conditionParameters[10] = 0.5
		conditionParameters[11] = 0.5


		for(var i=0; i<posterParameters.length; i++){
			if(posterParameters[i]==undefined)
				posterParameters[i] = 0
		}

		// var div2 = document.createElement("div")
		// div2.setAttribute("class","rating")
		// div2.setAttribute("id","rating"+index)
		// div2.innerHTML='<i class="far fa-thumbs-up fa-2x"></i><i class="far fa-thumbs-down fa-2x"></i>'
		// subdiv.appendChild(div2)

		var div2 = document.createElement("div")
		div2.setAttribute("class","rating")
		div2.setAttribute("id","rating"+index)
		div2.innerHTML='<div class="btn-group btn-group-toggle" id="toggle0" data-toggle="buttons"><label class="btn btn-secondary"><input type="radio" name="options" id="0" autocomplete="off" checked> 明亮</label><label class="btn btn-secondary"><input type="radio" name="options" id="1" autocomplete="off"> 黑暗</div><div class="btn-group btn-group-toggle" id="toggle1" data-toggle="buttons"><label class="btn btn-secondary"><input type="radio" name="options" id="0" autocomplete="off" checked> 柔和</label><label class="btn btn-secondary"><input type="radio" name="options" id="1" autocomplete="off"> 尖锐</div><div class="btn-group btn-group-toggle" id="toggle2" data-toggle="buttons"><label class="btn btn-secondary"><input type="radio" name="options" id="0" autocomplete="off" checked> 开心</label><label class="btn btn-secondary"><input type="radio" name="options" id="1" autocomplete="off"> 难过</div><div class="btn-group btn-group-toggle" id="toggle3" data-toggle="buttons"><label class="btn btn-secondary"><input type="radio" name="options" id="0" autocomplete="off" checked> 简约</label><label class="btn btn-secondary"><input type="radio" name="options" id="1" autocomplete="off"> 复杂</div><button type="button" class="btn btn-default">中性</button>&nbsp&nbsp<button type="button" class="btn btn-danger">复原</button>'
		subdiv.appendChild(div2)

		parametersList.push(posterParameters)
		conditionList.push(conditionParameters)
		drawList.push(draw)

		// console.log(parametersList)
		console.log("============================================")
	}

}

createPoster(100);

// console.log(drawList)

var backedOpacity

$(".btn-danger").on("click",function(){
	var clickedPoster = parseInt($(this).parent().parent().attr('id').replace(/[^0-9]/ig,""));
	$(this).parent().find(".btn-secondary").removeClass('active')
	$(this).parent().find(".btn-primary").removeClass('btn-primary').addClass('btn-default')
	
	conditionList[clickedPoster][8] = 0.5
	conditionList[clickedPoster][9] = 0.5
	conditionList[clickedPoster][10] = 0.5
	conditionList[clickedPoster][11] = 0.5

	// remove the poster from the list of good posters
	console.log(parametersList,conditionList)

	var undoId = goodPostersIndex.indexOf(clickedPoster)
	goodPostersIndex.splice(undoId,1)

	// console.log(goodPostersIndex)

})

$(".btn-default").on("click",function(){
	var clickedPoster = parseInt($(this).parent().parent().attr('id').replace(/[^0-9]/ig,""));
	$(this).parent().find(".btn-secondary").removeClass('active')
	$(this).removeClass('btn-default').addClass('btn-primary')
	
	conditionList[clickedPoster][8] = 0.5
	conditionList[clickedPoster][9] = 0.5
	conditionList[clickedPoster][10] = 0.5
	conditionList[clickedPoster][11] = 0.5

	// remove the poster from the list of good posters
	console.log(parametersList,conditionList)

	if(goodPostersIndex.indexOf(clickedPoster)<0){
		goodPostersIndex.push(clickedPoster)
	}

	// console.log(goodPostersIndex)

})

$('.btn-group-toggle .btn-secondary').on("click",function() {
	var clickedPoster = parseInt($(this).parent().parent().attr('id').replace(/[^0-9]/ig,""));
	var clickedToggle = parseInt($(this).parent().attr('id').replace(/[^0-9]/ig,""));
	var clickedButton = parseInt($(this).find('input').attr('id'))
	$(this).parent().parent().find(".btn-primary").removeClass('btn-primary').addClass('btn-default')

	// console.log(clickedPoster,clickedToggle,clickedButton)
	//update the label value
	conditionList[clickedPoster][7+clickedToggle]=clickedButton

	console.log(parametersList,conditionList)

	// add the a poster to the list of good posters
	if(goodPostersIndex.indexOf(clickedPoster)<0){
		goodPostersIndex.push(clickedPoster)
	}

	// console.log(goodPostersIndex)
});

//for inspecting the elements behind the big shapes.
$(".poster svg").on("mouseenter",function(){
	backedOpacity = []
	var selectedID = $(this).parent().attr("id").replace(/[^0-9]/ig,"");
	var selectedDraw =  drawList[selectedID]

	var childNodes = selectedDraw.children()
	for(var index in childNodes){
		backedOpacity.push(childNodes[index].opacity())
		childNodes[index].opacity(0.3)
	}
})

$(".poster svg").on("mouseleave",function(){
	var selectedID = $(this).parent().attr("id").replace(/[^0-9]/ig,"");
	var selectedDraw =  drawList[selectedID]

	var childNodes = selectedDraw.children()

	for(var index in childNodes){
		if(backedOpacity[index])
			childNodes[index].opacity(backedOpacity[index])
		else{
			childNodes[index].opacity(1)
		}
	}
})

//rating for good posters
// $('.fa-thumbs-up').click(function(){
// 	if($(this).hasClass('far')){
// 		$(this).removeClass('far')
// 		$(this).addClass('fas')
// 		$(this).siblings(".fas").removeClass('fas').addClass('far')
// 		var likeID = parseInt($(this).parent('div').attr('id').substring(6))
// 		if(goodPostersIndex.indexOf(likeID)<0){
// 			goodPostersIndex.push(likeID)
// 		}
// 		console.log(goodPostersIndex)
// 	}else if($(this).hasClass('fas')){
// 		$(this).removeClass('fas').addClass('far')
// 		var likeID = parseInt($(this).parent('div').attr('id').substring(6))
		
// 		var undoId = goodPostersIndex.indexOf(likeID)
// 		goodPostersIndex.splice(undoId,1)
// 		console.log(goodPostersIndex)
// 	}
// })

// $('.fa-thumbs-down').click(function(){
// 	if($(this).hasClass('far')){
// 		$(this).removeClass('far')
// 		$(this).addClass('fas')
// 		$(this).siblings(".fas").removeClass('fas').addClass('far')
// 	}else if($(this).hasClass('fas')){
// 		$(this).removeClass('fas').addClass('far')
// 	}
// })

var button = document.createElement("div")
button.setAttribute("style","text-align: center; padding: 20px")
button.innerHTML='<button id="save" style="height: 50px; width: 100px; font-size: large; margin:10px">Submit</button><button id="reload" style="height: 50px; width: 100px; font-size: large; margin:10px">Reload</button><p id="response"></p><p id="number"></p>'
document.body.appendChild(button)

$.get('/getRecord',function(data){
	$("#number").text(data+" good posters");
})

$("#save").on("click",function(){
	if(goodPostersIndex.length>0){
		var goodParameters = {};
		goodParameters.features = "";
		goodParameters.conditions = "";
		for(var i in goodPostersIndex){
			goodParameters.features += parametersList[goodPostersIndex[i]]+"|"
			goodParameters.conditions += conditionList[goodPostersIndex[i]]+"|"
		}

		goodParameters.features = goodParameters.features.substring(0,goodParameters.features.length-1)
		goodParameters.conditions = goodParameters.conditions.substring(0,goodParameters.conditions.length-1)


		$.ajax({
			 type: "POST",
			 url: "/saveRecord",
			 data: {
			 	"data":JSON.stringify(goodParameters)
			 },
			 dataType: "application/json",

			 success: function(data, err){
			 	if(err)
			 		console.log(err)
			 }
		});
	 	$("#response").text("Saved!");
	}else{
		$("#response").text("Please select a good poster, Ben!");
	}
})

$("#reload").on("click",function(){    
    window.location.reload()
	$(window).scrollTop(0);
})