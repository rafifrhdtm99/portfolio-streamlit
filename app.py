import streamlit as st
import streamlit.components.v1 as components
import base64
import os

# Set page config
st.set_page_config(
    page_title="Rafif Rohadiatama — Digital Marketing Portfolio",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Helper to read file
def read_file(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return ""

# Helper to get base64 of image
def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")
    return ""

# Rebuild single-file HTML
def build_html():
    html = read_file("index.html")
    css = read_file("style.css")
    js = read_file("script.js")
    
    # Try multiple paths for the avatar image
    possible_paths = [
        "images/rafif.jpg",
        "rafif.jpg",
        "images/rafif.png",
        "rafif.png",
        "images/rafif.jpeg",
        "rafif.jpeg",
        "images/rafif.JPG",
        "rafif.JPG",
        "images/rafif.PNG",
        "rafif.PNG"
    ]
    
    img_b64 = ""
    found_path = ""
    for path in possible_paths:
        if os.path.exists(path):
            img_b64 = get_base64_image(path)
            if img_b64:
                found_path = path
                break
    
    # Inline CSS & JS
    html = html.replace('<link rel="stylesheet" href="style.css" />', f'<style>{css}</style>')
    html = html.replace('<script src="script.js"></script>', f'<script>{js}</script>')
    
    # Inline Image
    if img_b64:
        mime_type = "image/png" if found_path.lower().endswith(".png") else "image/jpeg"
        html = html.replace('src="images/rafif.jpg"', f'src="data:{mime_type};base64,{img_b64}"')
        
    return html

# Hide Streamlit UI elements for a clean full-screen look
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            header {visibility: hidden;}
            footer {visibility: hidden;}
            .stApp {
                margin: 0px;
                padding: 0px;
                background-color: #050510;
            }
            .block-container {
                padding: 0px !important;
            }
            iframe {
                display: block;
                border: none;
                width: 100vw;
                height: 100vh;
            }
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# Build and render the HTML inside the iframe
html_content = build_html()
components.html(html_content, height=1200, scrolling=True)
