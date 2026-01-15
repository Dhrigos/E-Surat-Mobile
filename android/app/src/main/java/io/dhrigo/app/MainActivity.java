package io.dhrigo.app;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Add custom header to all requests to identify Capacitor app
        this.bridge.getWebView().setWebViewClient(new com.getcapacitor.BridgeWebViewClient(this.bridge) {
            @Override
            public android.webkit.WebResourceResponse shouldInterceptRequest(WebView view, android.webkit.WebResourceRequest request) {
                // Add custom header to identify app
                Map<String, String> headers = new HashMap<>(request.getRequestHeaders());
                headers.put("X-Capacitor-App", "true");
                
                return super.shouldInterceptRequest(view, request);
            }
        });
    }
}
