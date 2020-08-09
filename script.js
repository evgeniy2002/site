function ibg(){
	$.each($('.ibg'), function(index,val){
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();

$(document).ready(function(){
  $('.main-slider_body').slick({
  		adaptiveHeight:true,
  	responsive:[
  		{
  			breakpoint: 780,
  			settings: {
  				arrows:false,
  				dots:true
  			}
  		}
  	]
  })
})
$(document).ready(function(){
	$('.clints_slider_body').slick({
		arrows:false,
		dots:true,
		adaptiveHeight:true
	});
})

$(document).ready(function(){
	$('.header_burger').click(function(event){
		$('.header_burger,.header_menu').toggleClass('active')
		$('body').toggleClass('lock')
	})
})



$(document).ready(function(){
	$('.tab1').click(function(event){
		$('.tab1_btn_text,.tab1_btn').toggleClass('active')
	})
})
$(document).ready(function(){
	$('.tab2').click(function(event){
		$('.tab2_btn_text,.tab2_btn').toggleClass('active')
	})
})
$(document).ready(function(){
	$('.tab3').click(function(event){
		$('.tab3_btn_text,.tab3_btn').toggleClass('active')
	})
})
let btn = document.querySelectorAll('.product_btn');
for(let i = 0; i < btn.length;i++){
	btn[i].addEventListener('click',function(event){
		let target = event.target;
		target.classList.toggle('selected');
	});
}

let animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0){
	window.addEventListener('scroll',animOnScroll);
	function animOnScroll(){
		for(let index = 0; index < animItems.length; index++){
			let animItem = animItems[index];
			let animItemHeight = animItem.offsetHeight;
			let animItemOffset = offset(animItem).top;
			let animStart = 20;

			let animItemPoint = window.innerHeight - animStart;
			if(animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight / animStart;	
			}
			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			}else{
				if(!animItem.classList.contains('_anim-no-hide')){
					animItem.classList.remove('_active')
				}
			}
		}		
	}
	function offset(el){
		let rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
		return {top:rect.top + scrollTop,	left:rect.left + scrollLeft}
	}
}

let blog = document.querySelector('.blog_circule');

blog.addEventListener('click',function(event){
	window.scrollTo(0,12000);
})
