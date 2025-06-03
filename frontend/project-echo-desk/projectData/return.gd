extends Button
#this is return.gd button 

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass

func _on_pressed() -> void:
	var page = get_node_or_null("/root/page")
	if page:
		page.visible = true
	else:
		print("⚠️ Could not find 'page' node.")
