extends Button

@onready var optfield: TextEdit = $"../info-body/field-container/optfield"
@onready var detail_btn: Button = $"."
@onready var record_info: HBoxContainer = $".."



var hid := true
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	optfield.visible = false;
func _on_pressed() -> void:
	var container = record_info.get_parent()  # This is the VBoxContainer holding all record-info
	for child in container.get_children():
		if child.has_node("info-body/field-container/optfield"):
			child.get_node("info-body/field-container/optfield").visible = false
	if hid:
		optfield.visible = true
	elif !hid:
		optfield.visible = false
	hid = !hid
