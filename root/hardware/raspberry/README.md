# SET Raspberry Pi 4 as local API with Ubuntu server ISO

1. Use Raspberry pi imager to load ubuntu server image from to the SDcard[^1].
2. Set the SSID and PASSWORD for WIFI network using the raspbery pi imager tool
3. Inser the SDcard in the RPi4 and boot
4. Scan nmap the devices available in the same network and identify the ip of the raspberry
5. SSH to the raspberry as `ssh <USER>@<IP>`
6. Change the file in /etc/netplan/<file.yaml> to set an static ip for the raspberry, something as the following...

   ```
    network:
        version: 2
        wifis:
            renderer: networkd
            wlan0:
                access-points:
                    <SSID>:
                        password: <PASSWORD>
                dhcp4: no
                addresses:
                    - 192.168.1.200/24
                routes:
                    - to: default
                    via: 192.168.1.254
                nameservers:
                    addresses: [8.8.8.8,8.8.4.4]
   ```

7. Run: `sudo apt update`
8. Run: `sudo apt upgrade`
9. Install Nodejs and npm in [2]
10. Run: `git clone <https://github.com/<user>/repo.git>`
11. Add the .env file to /server folder with the secrets and mongodb endpoint
12. Install pm2 to run server at boot: `sudo npm install -g pm2`

[^1]: https://ubuntu.com/download/raspberry-pi .

[2] https://techviewleo.com/how-to-install-node-js-18-lts-on-ubuntu/

# Quick guide to start server from boot with pm2

Use [3] and [4] as guides to work with pm2

1. Run: `pm2 startup`
2. Go to server path where index.js or server.js is located
3. Run: `pm2 start npm --name "<NAME>" -- run start:dev` | `pm2 start npm --name "{app_name}" -- run {script_name}`
4. Run: `pm2 start server.js --name "<NAME>"`
5. Run: `pm2 start server.js --name "<NAME>" -o ./api.log -e ./api.log --merge-logs`
6. Add flag `-i max`to run cluster with maximum number of cores available
7. When all services are running run: `pm2 save`
8. RPi4 can be restarted and the server should start at boot automatically

[3] https://www.vultr.com/docs/how-to-manage-node-applications-with-pm2/

[4] https://pm2.keymetrics.io/docs/usage/quick-start/

# Pending installation with Alpine linux

[4] https://unix.stackexchange.com/questions/681220/netplan-generate-gateway4-has-been-deprecated-use-default-routes-instead

[5] https://alpinelinux.org/downloads/

[6] https://wiki.alpinelinux.org/wiki/Raspberry_Pi

[7] https://github.com/macmpi/alpine-linux-headless-bootstrap#user-content-fn-3-95007cf185b6076a6e40c44c3b2c728f

[8] https://devpress.csdn.net/linux/62ea044c6484667128339acd.html

[9] https://gist.github.com/ayushnix/9641b6b843411f2b49a5571083274802

[10] https://markbucciarelli.com/posts/2019-05-05_install-alpine-on-raspberry-pi-using-macos.html
