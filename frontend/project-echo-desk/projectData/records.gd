extends HBoxContainer
@onready var numbering: Button = $numbering
@onready var code: Button = $VSplitContainer/HBoxContainer/code
@onready var detailsbtn: Button = $detailsbtn

@onready var namaclient: LineEdit = $VSplitContainer/HBoxContainer/namaclient
@onready var badanusaha: LineEdit = $VSplitContainer/HBoxContainer/badanusaha
@onready var npwp: LineEdit = $VSplitContainer/HBoxContainer/npwp

@onready var optionals: TextEdit = $VSplitContainer/optionals
@onready var records: HBoxContainer = $"."

func set_data_from_client(
	client: ClientData,
	current_page: int = 1,
	page_size: int = 5,
	local_index: int = 0
) -> void:
	code.text = client.client_code
	namaclient.text = client.nama_client
	badanusaha.text = client.badan_usaha
	npwp.text = client.npwp

	var formatted_text = " NKP : %s\n Alamat: %s\n Telepon: %s\n Keterangan: %s" % [
		client.nkp if client.nkp != "" else "-",
		client.alamat if client.alamat != "" else "-",
		client.telp if client.telp != "" else "-",
		client.keterangan if client.keterangan != "" else "-"
	]
	optionals.text = formatted_text

	# Calculate global number
	var global_number = (current_page - 1) * page_size + local_index + 1
	numbering.text = str(global_number)



var details_shown := false

func _ready() -> void:
	optionals.visible = false

func _on_detailsbtn_pressed() -> void:
	var container = get_parent()
	if container == null:
		print("❌ Could not find container")
		
	if details_shown:
		for child in container.get_children():
			if child is HBoxContainer:
				child.visible = true
				optionals.visible = false
				#toggle back 
				details_shown = false
				detailsbtn.text = "OPEN DETAILS"
	else:
		for child in container.get_children():
			if child is HBoxContainer:
				child.visible = false
				
		records.visible = true
		optionals.visible = true
		details_shown = true
		detailsbtn.text = "CLOSE DETAILS"
		return
