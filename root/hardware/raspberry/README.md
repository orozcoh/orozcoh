# SET Raspberry Pi 4 as local API with Ubuntu server ISO

1. Use Raspberry pi imager to load ubuntu server image from [1] to the SDcard
2. Set the SSID and PASSWORD for WIFI network using the raspbery pi imager tool
3. Inser the SDcard in the RPi4 and boot
4. Scan nmap the devices available in the same network and identify the ip of the raspberry
5. SSH to the raspberry as ssh <user>@<ip>
6. Change the file in /etc/netplan/<file.yaml> to set an static ip for the raspberry, something as follows

   ````
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

   ````

7. Run: `sudo apt update`
8. Run: `sudo apt upgrade`
9. Install Nodejs and npm in [2]
10. Run: `git clone <https://github.com/<user>/repo.git>`

[1] https://ubuntu.com/download/raspberry-pi

[2] https://techviewleo.com/how-to-install-node-js-18-lts-on-ubuntu/

# Pending installation with Alpine linux

[3] https://unix.stackexchange.com/questions/681220/netplan-generate-gateway4-has-been-deprecated-use-default-routes-instead

[4] https://alpinelinux.org/downloads/

[5] https://wiki.alpinelinux.org/wiki/Raspberry_Pi

[6] https://github.com/macmpi/alpine-linux-headless-bootstrap#user-content-fn-3-95007cf185b6076a6e40c44c3b2c728f

[7] https://devpress.csdn.net/linux/62ea044c6484667128339acd.html

[8] https://gist.github.com/ayushnix/9641b6b843411f2b49a5571083274802
