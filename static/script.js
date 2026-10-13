function parseDesimal(value){
    const cleaned = value.trim().replace(',', '.');
    if(!/^-?+(\.\d+)?$/.test(cleaned)) return NaN;
    return parseFloat(cleaned);
}

document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const ids = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8']
    const features = ids.map(id => parseDesimal(document.getElementById(id).value));

    if(features.some(Number.isNaN)){
        alert('Semua input harus berupa angka yang valid (contoh: 45,7 atau 45.7)');
        return;
    }
    
    try{
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ features: features })
        });
        if(!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        
        document.getElementById('result').innerText = "Hasil Prediksi: " + data.hasil_prediksi.toLocalString('id-ID');
    }catch(error){
        console.error(`Terjadi kesalahan: ${error}`);
        alert('Gagal terhubung ke server');
    }
});