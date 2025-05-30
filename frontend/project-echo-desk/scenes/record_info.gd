extends HBoxContainer


# Called when the node enters the scene tree for the first time.
func set_data_from_client(client: ClientData) -> void:
	$"info-body/field-container/reqfield/code".text = client.client_code
	$"info-body/field-container/reqfield/nama".text = client.nama_client
	$"info-body/field-container/reqfield/usaha".text = client.badan_usaha
	$"info-body/field-container/reqfield/npwp".text = client.npwp
	
