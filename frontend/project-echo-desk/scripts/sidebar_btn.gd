extends Button

@onready var sidebar_container: VBoxContainer = $"../../../body/container/sidebar-container"
@onready var sidebar_btn: Button = $"."

var sidebar_open := true

func _ready() -> void:
	sidebar_btn.size_flags_stretch_ratio = 1
	sidebar_btn.text = "<===>"
	sidebar_container.visible = true
	
func _on_pressed() -> void:
	if sidebar_open:
		sidebar_btn.text = "<>"
		sidebar_btn.size_flags_stretch_ratio = 0.1
		sidebar_container.visible = false
	else:
		sidebar_btn.text = "<===>"
		sidebar_btn.size_flags_stretch_ratio = 1
		sidebar_container.visible = true
	sidebar_open = !sidebar_open
