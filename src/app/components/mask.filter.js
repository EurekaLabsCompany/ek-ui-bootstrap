(function(){

    'use strict'

	angular.module('ek-ui-bootstrap')
	.filter('mask', mask)

	function mask() {

		var maskFiller = '#';

		var predefinedMasks = {
				cnpj 		: "##.###.###/####-##",
				cpf  		: "###.###.###-##",
				cpf_cnpj  	: "##.###.###/####-##|###.###.###-##",
				cep  		: "##.###-###",
				tel  		: "####-####|#####-####",
				full_tel	: "(##) ####-####|(##) #####-####"
		}


		return function(value, format) {

			if(angular.isString(value)){
				value = value.toString();
			}else{
				return '';
			}

			var mask = predefinedMasks[format] || format;

			var isConditionalMask = mask.indexOf('|') >= 0;

			if(isConditionalMask){
				var maskParts = mask.split('|');

				for (var maskIndex = 0; maskIndex < maskParts.length; maskIndex++) {
					var conditionalMask = maskParts[maskIndex];

					conditionalMask = predefinedMasks[conditionalMask] || conditionalMask;

					if(isCompatible(conditionalMask, value)){
						return formatValue(value, conditionalMask);
					}
				}
			}else{
				return formatValue(value, mask);
			}

		}

		function isCompatible(mask, value){
			var maskCharacters = mask.replace(/[^#]/g, "");
			return maskCharacters.length == value.toString().length;
		}

		function formatValue(value, mask){
			var valueChars = value.split('');
			var maskChars = mask.split('');
			var maskedValue = '';

			while(maskChars.length > 0 && valueChars.length > 0){
				var maskChar = maskChars.shift();

				if(maskChar  === maskFiller){
					maskedValue += valueChars.shift();
				}else{
					maskedValue += maskChar;
				}

			}

			return maskedValue;

		}

	}


})();