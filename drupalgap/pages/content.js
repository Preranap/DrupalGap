$('#drupalgap_page_content').live('pageshow',function(){
	try {
		
		// Retrieve content.
		path = "views_datasource/drupalgap_content";
		content = drupalgap_views_datasource_retrieve({"path":path});
		
		// Clear the list.
		$("#drupalgap_page_content_list").html("");
		
		// If there is any content, add each to the list, otherwise show an
		// empty message.
		if ($(content.nodes).length > 0) {
			$.each(content.nodes,function(index,obj){
				$("#drupalgap_page_content_list").append($("<li></li>",{"html":"<a href='node.html' id='" + obj.node.nid + "'>" + obj.node.title + "</a>"}));
			});
		}
		else {
			$("#drupalgap_page_content_list").append($("<li></li>",{"html":"Sorry, there is no published content."}));
		}
		
		// If the user doesn't have at least one create permission for each
		// content type, hide the add button.
		var can_create = false;
		permissions = drupalgap_services_content_types_user_permissions();
		$.each(permissions,function(index,value){
			if (value.create) {
				can_create = true; 
				return;
			}
		});
		if (!can_create)
			$('#drupalgap_page_content_button_add').hide();
		else
			$('#drupalgap_page_content_button_add').show();
		
		// Refresh the list.
		$("#drupalgap_page_content_list").listview("destroy").listview();
	}
	catch (error) {
		console.log("drupalgap_page_content");
		console.log(error);
	}
});

// When a content list item is clicked...
$('#drupalgap_page_content_list a').live("click",function(){
	// Save a reference to the node id.
	drupalgap_page_node_nid = $(this).attr('id');
});