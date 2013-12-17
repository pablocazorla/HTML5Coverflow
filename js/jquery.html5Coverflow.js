/* Template Plugin
 * @author: Pablo Cazorla
 * @e-mail: pablo.cazorla@huddle.com.ar
 * @date: 22/08/2012
 */
(function($){
  $.fn.HTML5Coverflow = function(options){
		//Settings
		var setting = $.extend({
	      		
	      		
	      		distance : 40, // %
	      		centerMargin :0, // %
	      		
	      		initial : 6,
	      		
	      		zIndex :2000,
	      		
	      		
	      		elementType : 'figure',
	      		
	      		perspective : 700, // px
	      		perspectiveOrigin: '50% 60%', // %
	      		transition : 0.7,
	      		moveBack : 40, // px
	      		
			}, options),	
				
			classID = 'coverflow' + Math.round(9999999 * Math.random()),
			style = 
			'<style>'+			
				'.'+ classID + '{'+	
					'perspective:'+setting.perspective+'px;'+
					'-webkit-perspective:'+setting.perspective+'px;'+
					'perspective-origin:'+setting.perspectiveOrigin+';'+
					'-webkit-perspective-origin:'+setting.perspectiveOrigin+';'+
					
				'}'+
				'.'+ classID + ' ' + setting.elementType + '{'+					
					'-webkit-transition: all '+ setting.transition +'s;'+
					'-moz-transition: all '+ setting.transition +'s;'+
					'-ms-transition: all '+ setting.transition +'s;'+
					'transition: all '+ setting.transition +'s;'+
					'-webkit-transform-origin:50% 50%;'+
					'-moz-transform-origin:50% 50%;'+
					'-ms-transform-origin:50% 50%;'+
					'transform-origin:50% 50%;'+					
				'}'+
				'.'+ classID + ' ' + setting.elementType + '.prev{'+
					'-webkit-transform: rotateY(90deg) translateX(' + setting.moveBack + 'px);'+
					'-moz-transform: rotateY(90deg) translateX(' + setting.moveBack + 'px);'+
					'transform: rotateY(90deg) translateX(' + setting.moveBack + 'px);'+					
				'}'+
				'.'+ classID + ' ' + setting.elementType + '.next{'+
					'-webkit-transform: rotateY(-90deg) translateX(-' + setting.moveBack + 'px);'+
					'-moz-transform: rotateY(-90deg) translateX(-' + setting.moveBack + 'px);'+
					'transform: rotateY(-90deg) translateX(-' + setting.moveBack + 'px);'+					
				'}'+
			'</style>';
		
		$(style).appendTo( "head" );
		
		return this.each(function(){			
			var $this = $(this).addClass(classID),
				$f = $this.find(setting.elementType),
				w = $f.eq(0).width(),
				centerX = ($this.width()-w)/2,				
				marginCenter = setting.stepCenter - setting.step,
				current = setting.initial,
				step = 	Math.round(setting.distance/100 * w),
				centerMargin = Math.round(setting.centerMargin/100 * w) + step,
				draw = function(){
					var l = $f.length;
					for(var i=0;i<l;i++){
						var dz = i - current,
							dx = dz*step;
						if(dx < 0){
							dx = dx - centerMargin;
							$f.eq(i).removeClass('next').addClass('prev');
						}else if(dx == 0){
							$f.eq(i).removeClass('next').removeClass('prev');
						}else{
							dx = dx + centerMargin;
							$f.eq(i).addClass('next').removeClass('prev');
						}
						$f.eq(i).css({'left': centerX+dx+'px','z-index':setting.zIndex - Math.abs(dz)});
					}
				},
				dragging = false,
				mouseX = 0;
			
			//init
			draw();
			$f.each(function(index){
				$(this).click(function(){
					current = index;
					draw();
				});
			});
			
			$this.mousedown(function(event){
				dragging = true;
				
				mouseX = event.pageX;
			});
			
			$('body').mousemove(function(event){
				if(dragging){
					
					var n = Math.round((event.pageX - mouseX)/300);
					
				}
			}).mouseup(function(){
				dragging = false;
			});
			
		});
	};
})(jQuery);