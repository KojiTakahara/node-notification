exports.base64enc = function (str) {
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var len = str.length;
	var i = 0;
	var out = "";
	var d1, d2, d3, d4, d5, d6;

	while(i < len){
		d1 = Number("0x"+str.charAt(i++)).toString(10);
		if(i == len){	//たぶん使用されない？
			out += base64EncodeChars.charAt(d1 << 2);
			out += "===";
			break;
		}
		d2 = Number("0x"+str.charAt(i++)).toString(10);
		if(i == len){
			out += base64EncodeChars.charAt((d1 << 2)|(d2 >> 2));
			out += base64EncodeChars.charAt((d2 & 0x3) << 4);
			out += "==";
			break;
		}
		d3 = Number("0x"+str.charAt(i++)).toString(10);
		if(i == len){
			out += base64EncodeChars.charAt((d1 << 2)|(d2 >> 2));
			out += base64EncodeChars.charAt(((d2 & 0x3) << 4)| d3);
			out += "==";
			break;
		}
		d4 = Number("0x"+str.charAt(i++)).toString(10);
		if(i == len){
			out += base64EncodeChars.charAt((d1 << 2)|(d2 >> 2));
			out += base64EncodeChars.charAt(((d2 & 0x3) << 4)| d3);
			out += base64EncodeChars.charAt(d4 << 2);
			out += "=";
			break;
		}
		d5 = Number("0x"+str.charAt(i++)).toString(10);
		if(i == len){
			out += base64EncodeChars.charAt((d1 << 2)|(d2 >> 2));
			out += base64EncodeChars.charAt(((d2 & 0x3) << 4)| d3);
			out += base64EncodeChars.charAt((d4 << 2)|(d5 >> 2));
			out += base64EncodeChars.charAt((d5 & 0x3) << 4);
			break;
		}
		d6 = Number("0x"+str.charAt(i++)).toString(10);
			out += base64EncodeChars.charAt((d1 << 2)|(d2 >> 2));
			out += base64EncodeChars.charAt(((d2 & 0x3) << 4)| d3);
			out += base64EncodeChars.charAt((d4 << 2)|(d5 >> 2));
			out += base64EncodeChars.charAt(((d5 & 0x3) << 4)| d6);

	} //while() END
	return out;
} //function END