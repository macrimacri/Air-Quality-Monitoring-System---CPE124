#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <MQ135.h>
#define SERVER_IP "raspberrypi.local:3000"
#ifndef STASSID
#define STASSID "PuaExtention 2.4"
#define STAPSK "Pua@SurePass"
#endif

#define SIG A0
#define S0 5

DHT dht (2,DHT11);
MQ135 mq135S(SIG);
String dataN;  
void setup() {

  Serial.begin(115200);
  Serial.println();
  Serial.println();
  Serial.println();
  WiFi.begin(STASSID, STAPSK);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
  dht.begin();
  pinMode(S0,OUTPUT);
  pinMode(SIG,INPUT);
}

void loop() {
  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {
    WiFiClient client;
    HTTPClient http;
    String temp = String(dht.readTemperature(),1);
    String Rhum = String(dht.readHumidity(),1);
    digitalWrite(S0,LOW);
    float correctedPPM = analogRead(SIG);//mq135S.getCorrectedPPM(dht.readTemperature(),dht.readHumidity());
    String co2 = String(correctedPPM,2);
    digitalWrite(S0,HIGH);
    float mq7 = analogRead(SIG);
    String co = String(mq7,2);
    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/sensorUpdate");  // HTTP
    http.addHeader("Content-Type", "application/json"); // "application/json");
    Serial.print("[HTTP] POST...\n");
    StaticJsonDocument <200> doc;
    doc["temp"] = temp;
    doc["Rhum"] = Rhum;
    doc["co2"] = co2;
    doc["co"] = co;
    serializeJson(doc,dataN);
    // start connection and send HTTP header and body
    int httpCode = http.PUT(dataN);
    dataN = "";
    doc.clear();
    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }

  delay(10000);
}
