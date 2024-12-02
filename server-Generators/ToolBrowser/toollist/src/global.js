$(function(){
		$("#tree").dynatree({
			autoFocus: true,
			persist: true,
			minExpandLevel: 2,
			onFocus: function(node) {
				// Auto-activate focused node after 1 second
				if(node.data.href){
					node.scheduleAction("activate", 1000);
				}
			},
			onBlur: function(node) {
				node.scheduleAction("cancel");
			},
			onActivate: function(node){
				if(node.data.href){
					window.open(node.data.href, node.data.target);
				}
			}
		});
	});