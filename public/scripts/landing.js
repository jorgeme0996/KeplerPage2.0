$(document).ready(function() {
	var controller = new ScrollMagic.Controller({
		
	})
	
	TweenMax.set('.project', {
		y: 20
	});
	
	var projects = document.getElementsByClassName('project');
	
	function createProjectScenes(arr) {
		for(let i = 0; i < arr.length; i++) {
				createScene(arr[i], i);
		}
	};
	
	function createScene(element, i) {
		var name = 'project' + i;
		console.log(name);
		 var name = new ScrollMagic.Scene({
		triggerElement: element 
	})
		.setTween(element, .2, {
			opacity: 1,
			y: -10
		})
		.addTo(controller)
		 return name;

	}
	
	createProjectScenes(projects);
	
	
	var controller2 = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onEnter',
			duration: '200%'
		}
	});
		
		new ScrollMagic.Scene({ triggerElement:'#parallax1'})
		.setTween('#parallax1 > div', {
			y:'80%',
			ease: Linear.easeNone
		})
		.addTo(controller2);

	new ScrollMagic.Scene({ triggerElement:'#parallax2'})
		.setTween('#parallax2 > div', {
			y:'80%',
			ease: Linear.easeNone
		})
		.addTo(controller2);
	
	var controller3 = new ScrollMagic.Controller();
	
	var wipeAnimations = new TimelineMax()
		.fromTo('.panel.misionVision', 0, { x: '-120%'	}, { x: '0%', ease: Linear.easeNone})
		.fromTo('.panel.mis', 0, { x: '-100%'	}, { x: '0%', ease: Linear.easeNone})
	.fromTo('.panel.vis', 0, { opacity: 0	}, { opacity: 5, ease: Linear.easeNone});
	
new ScrollMagic.Scene({
	triggerElement: '#pin-container',
	triggerHook: 'onLeave',
	duration: '500%'
})
	.setPin('#pin-container')
	.setTween(wipeAnimations)
	.addTo(controller3);	
});