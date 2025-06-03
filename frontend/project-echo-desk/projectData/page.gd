extends VBoxContainer

@onready var client: Button = $client
@onready var case: Button = $case
@onready var consult: Button = $consult
@onready var content: Control = $"../content"
  # This is the container where views will be loaded
@onready var page: VBoxContainer = $"."


const CASE_SCENE = preload("res://projectData/case.tscn")
const CLIENT_SCENE = preload("res://projectData/client.tscn")
const CONSULT_SCENE = preload("res://projectData/consult.tscn")

func _ready() -> void:
	client.pressed.connect(_on_client_pressed)
	case.pressed.connect(_on_case_pressed)
	consult.pressed.connect(_on_consult_pressed)

func _on_client_pressed():
	_load_scene(CLIENT_SCENE)

func _on_case_pressed():
	_load_scene(CASE_SCENE)

func _on_consult_pressed():
	_load_scene(CONSULT_SCENE)

func _load_scene(scene: PackedScene) -> void:
	# Clear existing scene
	for child in content.get_children():
		child.queue_free()

	# Load new one
	var new_scene = scene.instantiate()
	content.add_child(new_scene)
	page.visible = false
