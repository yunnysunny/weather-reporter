package tests;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Weather {

	public static void main(String[] args) throws MalformedURLException,
			IOException {
		String result = getWeather("101010100");
		System.out.println(result);
	}

	public static String getWeather(String cityId) {
		String result = "";

		HttpURLConnection connection = null;
		try {
			
			connection = (HttpURLConnection) new URL(
					"http://m.weather.com.cn/data/${cityId}.html".replace(
							"${cityId}", cityId)).openConnection();
			connection.setDoOutput(true);
			connection.setRequestMethod("GET");
			connection.setRequestProperty("accept", "text/xml;text/html");
			connection.setUseCaches(false);
			connection.connect();
			if (connection.getResponseCode() == 200) {
				StringBuilder responseStr = new StringBuilder("");
				BufferedReader reader = null;
				try {
					reader = new BufferedReader(new InputStreamReader(
							connection.getInputStream()));
					for (String line = reader.readLine(); line != null; line = reader
							.readLine()) {
						responseStr.append(line);
					}
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					if (reader != null)
						reader.close();
				}
				connection.disconnect();
				result = responseStr.toString();
			}
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}
		return result;
	}
}
