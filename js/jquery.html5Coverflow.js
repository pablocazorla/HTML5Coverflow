/* Template Plugin
 * @author: Pablo Cazorla
 * @e-mail: pablo.cazorla@huddle.com.ar
 * @date: 22/08/2012
 */
(function($){
  $.fn.HTML5Coverflow = function(options){
		//Settings
		var setting = $.extend({
      		step : 100,
      		stepCenter :170,
      		initial : 0,
      		elementType : 'figure'
		}, options);		
	
		return this.each(function(){			
			var $this = $(this),
				$f = $this.find(setting.elementType),
				centerX = ($this.width() - $f.width())/2,
				marginCenter = setting.stepCenter - setting.step,
				current = setting.initial,				
				draw = function(){
					var l = $f.length;
					for(var i=0;i<l;i++){
						var dz = i - current,
							dx = dz*setting.step;
							
						if(dx < 0){
							dx = dx - marginCenter;
							$f.eq(i).removeClass('next').addClass('prev');
						}else if(dx == 0){
							$f.eq(i).removeClass('next').removeClass('prev');
						}else{
							dx = dx + marginCenter;
							$f.eq(i).addClass('next').removeClass('prev');
						}
						$f.eq(i).css({'left': centerX+dx+'px','z-index':2000 - Math.abs(dz)});
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