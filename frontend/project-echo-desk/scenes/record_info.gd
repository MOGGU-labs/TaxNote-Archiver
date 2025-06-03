extends HBoxContainer


# Called when the node enters the scene tree for the first time.
func set_data_from_client(client: ClientData) -> void:
	$"info-body/field-container/reqfield/code".text = client.client_code
	$"info-body/field-container/reqfield/nama".text = client.nama_client
	$"info-body/field-container/reqfield/usaha".text = client.badan_usaha
	$"info-body/field-container/reqfield/npwp".text = client.npwp
	
	var formatted_text = " NKP : %s\n Alamat: %s\n Telepon: %s\n Keterangan: %s" % [
		client.nkp if client.nkp != "" else "-",
		client.alamat if client.alamat != "" else "-",
		client.telp if client.telp != "" else "-",
		client.keterangan if client.keterangan != "" else "-"
	]
	$"info-body/field-container/optfield".text = formatted_text
	
	var parent = get_parent()
	if parent:
		var index = parent.get_children().find(self)
		$"info-body/number".text = str(index + 1)
		
	
