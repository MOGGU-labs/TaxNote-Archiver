extends Node

func _ready():
	var crypto = Crypto.new()
	# Generate RSA key yang sama size nya (2048)
	var private_key = crypto.generate_rsa(2048)
	
	
	var encrypted_base64 = "ajMV9LLbuH7P4JE6/1+uzZWxYLzApHu4iXxbAD4AV9oXIpGORMN+Cxv74++sOx+iRYw7owgVkRCKnt2Ejuh6yUlnjQI2D2MI/e6EarLtOaBsHR89WP1xGvEUYjDgwTYFz3S59a4t+TOU1439wyu+ctK12vEXSF2pl9mdiEs7pm0Z0/lzyjy7y46P/pLIKAT3j3QM2Fudqeq/kBQpbsTqvyOawigIvHnHBDTxrPwUXmM/L5cwqHkwmL/c+WZt68Zq7cVwvCAd/u+FajTDF1S7AOQeZwAr//4rpQM2yJPYViMEB5TqNf4SDdcD309b1uSFBifurtkn37a2T1w+mJCacw==
"

	var encrypted_bytes = Marshalls.base64_to_raw(encrypted_base64)
	var decrypted_bytes = crypto.decrypt(private_key, encrypted_bytes)
	
	if decrypted_bytes.size() == 0:
		print("❌ Failed to decrypt.")
		return

	var decrypted_string = decrypted_bytes.get_string_from_utf8()
	print("✅ Decrypted JWT:", decrypted_string)
