extends Button

@onready var optfield: TextEdit = $"../info-body/field-container/optfield"
@onready var record_info: HBoxContainer = $".."
@onready var detail_btn: Button = $"."

var details_shown := false  # Track toggle state

func _ready() -> void:
	optfield.visible = false

func _on_pressed() -> void:
	# Walk up the tree to find table-container
	var container = get_parent()
	while container and container.name != "TableContainer":
		container = container.get_parent()

	if container == null:
		print("❌ Could not find table-container")
		return

	if details_shown:
		# Show all records (undo filtering)
		for child in container.get_children():
			if child is HBoxContainer:
				child.visible = true
		optfield.visible = false
		details_shown = false
		detail_btn.text = "Open Details"
	else:
		# Hide all records first
		for child in container.get_children():
			if child is HBoxContainer:
				child.visible = false

		# Show only the clicked record and optfield
		record_info.visible = true
		optfield.visible = true
		details_shown = true
		detail_btn.text = "Close Details"
