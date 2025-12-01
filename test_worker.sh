#!/bin/bash

echo "Testing Cloudflare Worker for AI Image Generation..."

# Test 1: Check if the main page loads
echo "Test 1: Checking if main page loads..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/)
if [ $HTTP_CODE -eq 200 ]; then
    echo "✅ Main page loads successfully (HTTP $HTTP_CODE)"
else
    echo "❌ Main page failed (HTTP $HTTP_CODE)"
fi

# Test 2: Check if API config endpoint works
echo "Test 2: Checking API config endpoint..."
CONFIG_RESPONSE=$(curl -s http://localhost:8787/api/config)
if echo "$CONFIG_RESPONSE" | grep -q "apiBaseUrl"; then
    echo "✅ API config endpoint works"
else
    echo "❌ API config endpoint failed"
    echo "Response: $CONFIG_RESPONSE"
fi

# Test 3: Check if assets are served
echo "Test 3: Checking if CSS asset is served..."
CSS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/assets/style.css)
if [ $CSS_CODE -eq 200 ]; then
    echo "✅ CSS asset served successfully (HTTP $CSS_CODE)"
else
    echo "❌ CSS asset failed (HTTP $CSS_CODE)"
fi

JS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/assets/script.js)
if [ $JS_CODE -eq 200 ]; then
    echo "✅ JavaScript asset served successfully (HTTP $JS_CODE)"
else
    echo "❌ JavaScript asset failed (HTTP $JS_CODE)"
fi

echo ""
echo "Testing complete!"
echo ""
echo "The Cloudflare Worker is running at: http://localhost:8787/"
echo "You can now access the AI Image Generator web interface."
echo ""
echo "To test image generation, you'll need:"
echo "1. An API key for the image generation service"
echo "2. The API endpoint should be configured as: https://z-api.aioec.tech/proxy/generate"