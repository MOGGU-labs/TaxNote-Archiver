extends Node

class_name ClientData
var id_client: int
var client_uuid: String
var client_code: String
var nama_client: String
var badan_usaha: String
var telp: String
var alamat: String
var npwp: String
var nkp: String
var keterangan: String
var created_at: String
var updated_at: String
var is_deleted: bool
var deleted_at: Variant

static func safe_get(dict: Dictionary, key: String, default_value) -> Variant:
	return dict[key] if dict.has(key) and dict[key] != null else default_value

static func from_dict(dict: Dictionary) -> ClientData:
	var c := ClientData.new()
	c.id_client = safe_get(dict, "id_client", 0)
	c.client_uuid = safe_get(dict, "client_uuid", "")
	c.client_code = safe_get(dict, "client_code", "")
	c.nama_client = safe_get(dict, "nama_client", "")
	c.badan_usaha = safe_get(dict, "badan_usaha", "")
	c.telp = safe_get(dict, "telp", "")
	c.alamat = safe_get(dict, "alamat", "")
	c.npwp = safe_get(dict, "npwp", "")
	c.nkp = safe_get(dict, "nkp", "")
	c.keterangan = safe_get(dict, "keterangan", "")
	c.created_at = safe_get(dict, "created_at", "")
	c.updated_at = safe_get(dict, "updated_at", "")
	c.is_deleted = safe_get(dict, "is_deleted", false)
	c.deleted_at = dict.get("deleted_at", null)
	return c
