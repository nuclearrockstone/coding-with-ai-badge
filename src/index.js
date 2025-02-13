/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const transform_dict = {deepseek:'scale(1.2, 1.2) translate(7,7)',chatgpt:'scale(0.5, 0.5) translate(10,10)',gpt3:'scale(0.5, 0.5) translate(10,10)'}
const name_dict = {deepseek:'DeepSeek',chatgpt:'ChatGPT',gpt3:'GPT-3'}
export default {
	async fetch(request,env) {
		const url = new URL(request.url)
		const protocol = url.protocol;
		const host = url.host;
		console.log(protocol,host);
		const text = url.searchParams.get('text') || 'coding with'  ;// 获取查询参数中的'text'，默认为'Hello, World!'
		const model = url.searchParams.get('model') || 'openai';
		const response = await env.ASSETS.fetch(protocol+host+'/'+model+'.svg');
		const svg = await response.text();
		let pathContent = '';
		let pathDataList = [];

		// 使用 HTMLRewriter 解析并提取 <path> 标签内容
		const rewriter = new HTMLRewriter()
		.on('path', {
			element(element) {
			// 获取 <path> 标签的 d 属性（路径数据）
			const dAttribute = element.getAttribute('d');
			pathDataList.push(dAttribute);
			}
		});

		// 将 SVG 内容通过 HTMLRewriter 处理
		async function processSVG(svgText) {
			const response = new Response(svgText); // 将 SVG 文本作为响应体
			await rewriter.transform(response).text(); // 执行转换操作			
			return pathDataList;
		}

		// 调用并输出结果
		await processSVG(svg).then(result => {
			pathDataList = result;
		});

		let text_up = Math.ceil(5.83*text.length);
		let text_down = Math.ceil(11.5*model.length);
		let text_x = Math.max(text_up,text_down);
	  
		// 构建SVG内容
		const svgContent = `
		  <svg xmlns="http://www.w3.org/2000/svg" width="${text_x+57}" height="50">
			<defs>
		  <linearGradient id="Gradient2" x1="1" x2="0" y1="1" y2="1">
      		<stop offset="0%" stop-color="#dc2430" />
      		<stop offset="100%" stop-color="#7b4397" />
    		</linearGradient>
		  </defs>
			
			<rect width="100%" height="100%" fill="url(#Gradient2)" rx="10" ry="10"/>
			${pathDataList.map((d, index) => `<path d="${d}" fill="white" fill-rule="evenodd" transform="scale(1.7,1.7) translate(3,3)" />`).join(' ')}
			<text x="${text_x/2+50}" y="80%" font-size="20" text-anchor="middle" fill="white" textLength="${text_down}" font-weight='bold'>${name_dict[model] || model}</text>			
			<text x="${text_x/2+50}" y="35%" font-size='10' text-anchor="middle" fill="white" textLength="${text_up}">${text}</text>
		  </svg>
		`


		// 返回SVG图像响应
		return new Response(svgContent, {
		  headers: {
			'Content-Type': 'image/svg+xml'
		  },
		});
	},
};
