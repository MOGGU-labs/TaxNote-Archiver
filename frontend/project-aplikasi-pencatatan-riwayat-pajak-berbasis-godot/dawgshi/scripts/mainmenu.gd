extends Control
@onready var controlsidebar: Button = $BG/VBoxContainer/BoxContainer/bodyContainer/header/ColorRect2/controlsidebar
@onready var animation_player: AnimationPlayer = $AnimationPlayer
var sidebar_open := true

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_controlsidebar_pressed() -> void:
	if sidebar_open:
		animation_player.play_backwards("open")
	else:
		animation_player.play("open")
	sidebar_open = !sidebar_open
