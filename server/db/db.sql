INSERT INTO users (
    first_name, last_name,  _role, username, password
) values ('sindy','Herrrera','customer', 'Username','sindyPassword');

UPDATE users
SET last_name = 'Herrera' WHERE id = 2;

INSERT INTO orders(
    customer_name,address,psi,stone,accelerator,retarder,yards,slump ,unload_method
) values ('sofia','5925 89th ave new carrollton md 20784', 3500, 'pea gravel', '0', '0', 10.5, 4, 'chute','delivered',1);