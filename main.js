// const Login = document.querySelector('.Login');
// const home = document.querySelector('.home');
// const button_login = document.querySelector('.button_login');
const arrs = []
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const admin_btn = $('.admin_btn');
const user_btn = $('.user_btn');
const chucNang = $('.chucNang');
const edit_btn = $('.edit_btn');
const Them_btn = $('.Them_btn');
const Sua_btn = $('.Sua_btn');

function login1(){
	document.querySelector('.home').style.display = 'none';
	document.querySelector('.Login').style.display = 'block';
}



function login(){
	var userName = document.getElementById("user_name").value
	var passWord = document.getElementById("user_password").value
	if(userName === 'ngocnhatbruh' && passWord === "Ngoc123456"){
		document.querySelector('.home').style.display = 'block';
		document.querySelector('.Login').style.display = 'none';
		document.querySelector('.sign').style.display = 'none';
		document.querySelector('.logOut').style.display = 'block';
	}
	else confirm('Có cái tài khoản/mật khẩu cũng đéo nhớ được.')
}

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});

admin_btn.onclick = function (){
	var mua_btn = Object.values($$('.mua_btn'))
	mua_btn.forEach(function(mua){
		return mua.style.display = 'none'
	})
	var GH_btn = Object.values($$('.GH_btn'))
	GH_btn.forEach(function(GH){
		return GH.style.display = 'none'
	})
	admin_btn.style.display = 'none';
	chucNang.style.display = 'block';
	user_btn.style.display = 'block';
	if($('.insert') != null){ $('.insert').remove() }
	tabs.forEach((tab) => {
		$(".tab-pane.active").classList.remove("active");
	  
		line.style.left = this.offsetLeft + "px";
		line.style.width = this.offsetWidth + "px";
	  
		this.classList.add("active");
		panes[0].classList.add("active");
	
	})
}

user_btn.onclick = function (){
	var mua_btn = Object.values($$('.mua_btn'))
	mua_btn.forEach(function(mua){
		return mua.style.display = 'block'
	})
	var GH_btn = Object.values($$('.GH_btn'))
	GH_btn.forEach(function(GH){
		return GH.style.display = 'block'
	})
	admin_btn.style.display = 'block';
	chucNang.style.display = 'none';
	user_btn.style.display = 'none';

	mua_btn.forEach(function(mua){
		mua.onclick = function (){
			confirm('Có cái con cặc!!!')
		}
	})
	var xoa_btn = Object.values($$('.xoa_btn'))
	xoa_btn.forEach(function(xoa){
		return xoa.style.display = 'none';
	})
	var sua_btn = Object.values($$('.sua_btn'))
	sua_btn.forEach(function(sua){
		return sua.style.display = 'none';
	})
	themVaoGioHang()
}

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");

	switch(index){
		case 0:{
			var xoa_btn = Object.values($$('.xoa_btn'))
			xoa_btn.forEach(function(xoa){
				return xoa.style.display = 'none';
			})
			var sua_btn = Object.values($$('.sua_btn'))
			sua_btn.forEach(function(sua){
				return sua.style.display = 'none';
			})
			if($('.insert') != null){ $('.insert').remove() }
			document.getElementById("insert_id").insertAdjacentHTML('beforeend', `<div class="insert">
			<!-- <form class="form" action=" "> -->
				<div align="center" class="ipt">
					<label for="ten_sp">Tên sản phẩm</label>
					<input class="input input_ten" id="ten_sp" type="text" placeholder="Tên sản phẩm">
				</div>
				<div align="center" class="ipt">
					<label for="link_anh">Link ảnh</label>
					<input class="input input_link" id="link_anh" type="text" placeholder="Link ảnh">
				</div>
				<div align="center" class="ipt">
					<label for="so_luong">Số lượng</label>
					<input class="input input_sl" id="so_luong" type="text" placeholder="Số lượng">
				</div>
				<div align="center" class="ipt">
					<label for="gia">Giá</label>
				<input class="input input_gia" id="gia" type="text" placeholder="Giá">
				</div>
				<button class="btn Them_btn" type="submit" onclick="them()">Thêm</button>
			<!-- </form> -->
			</div>`)
			Sua()
			break;
		}
		case 1:{
			var mua_btn = Object.values($$('.mua_btn'))
			mua_btn.forEach(function(mua){
				return mua.style.display = 'none'
			})
			var xoa_btn = Object.values($$('.xoa_btn'))
			xoa_btn.forEach(function(xoa){
				return xoa.style.display = 'block'
			})
			var sua_btn = Object.values($$('.sua_btn'))
			sua_btn.forEach(function(sua){
				return sua.style.display = 'none';
			})
			xoa_hang()
			break;
		}
		case 2:{
			if($('.insert') != null){ $('.insert').remove() }
			var xoa_btn = Object.values($$('.xoa_btn'))
			xoa_btn.forEach(function(xoa){
				return xoa.style.display = 'none';
			})
			var sua_btn = Object.values($$('.sua_btn'))
			sua_btn.forEach(function(sua){
				return sua.style.display = 'block';
			})
			Sua()
			break;
		}
		default :{

		}
	}
  };
});

var link_anh = document.getElementsByClassName('link_anh')
var ten_sp = document.getElementsByClassName('ten_sp')
var so_luong = document.getElementsByClassName('sl_value')
var gia = document.getElementsByClassName('gia_value')

for(var i = 0; i < ten_sp.length; i++){
	arrs.push({
		link_anh: link_anh[i].style.backgroundImage.slice(5, -2),
		ten_sp: ten_sp[i].innerHTML,
		so_luong: so_luong[i].innerHTML,
		gia: gia[i].innerHTML,
	})
}

function them(){
	if(document.getElementById("ten_sp").value === '' || 
	document.getElementById("link_anh").value === '' || 
	document.getElementById("so_luong").value === '' || 
	document.getElementById("gia").value === '') {
		return confirm("Điền số liệu!!!")
	}
	else{
		var gia = String(document.getElementById("gia").value)
		for(var i = gia.length - 3; i > 0; i -= 3)
		gia = gia.slice(0, i) + '.' + gia.slice(i)
		arrs.push({
			link_anh: `${document.getElementById("link_anh").value}`,
			ten_sp: `${document.getElementById("ten_sp").value}`,
			so_luong: `${document.getElementById("so_luong").value}`,
			gia: gia
		})
	}
	them1(arrs[arrs.length - 1])
	document.getElementById("link_anh").value = ""
	document.getElementById("ten_sp").value = ""
	document.getElementById("so_luong").value = ""
	document.getElementById("gia").value = ""	
}

function them1(arrs){
	return document.getElementById("san_pham").insertAdjacentHTML('beforeend', `<div class="sanPham" align="center">
	<div class="img_sp link_anh" style="background-image: url(${arrs.link_anh});"></div>
	<div class="thongTin">
		<h3 class="ten_sp">${arrs.ten_sp}</h3>
		<p class="sl">Số lượng:&nbsp;</p><p class="sl sl_value">${arrs.so_luong}</p><br>
		<p class="gia">Giá:&nbsp;</p><p class="gia gia_value">${arrs.gia}</p><p class="gia">&nbsp;đ</p>
		<button class="btn mua_btn" style="display: none;">Mua hàng</button>
		<button class="btn GH_btn" style="display: none;">Thêm vào giỏ hàng</button>
		<button class="btn xoa_btn"  style="display: none;">Xóa hàng</button>
		<button class="btn sua_btn"  style="display: none;">Sửa hàng</button>
	</div>`) 
}

// erase_btn.onclick = function (){
	
// }

function xoa_hang(){
	var xoa_btn = Object.values($$('.xoa_btn'))
	xoa_btn.forEach(function(xoa_btn, index){
		xoa_btn.onclick = function (){
			document.getElementsByClassName('sanPham')[index].remove()
			arrs.splice(index, 1)
			return xoa_hang()
		}	
	})
}

function Sua(){
	var sua_btn = Object.values($$('.sua_btn'))
	sua_btn.forEach(function(sua_btn, index){
		sua_btn.onclick = function (){
			if($('.insert') != null){ $('.insert').remove() }
			document.getElementById("edit_id").insertAdjacentHTML('beforeend', `<div class="insert">
			<!-- <form class="form" action=" "> -->
				<div align="center" class="ipt">
					<label for="ten_sp">Tên sản phẩm</label>
					<input class="input input_ten" id="ten_sp" type="text" placeholder="Tên sản phẩm">
				</div>
				<div align="center" class="ipt">
					<label for="link_anh">Link ảnh</label>
					<input class="input input_link" id="link_anh" type="text" placeholder="Link ảnh">
				</div>
				<div align="center" class="ipt">
					<label for="so_luong">Số lượng</label>
					<input class="input input_sl" id="so_luong" type="text" placeholder="Số lượng">
				</div>
				<div align="center" class="ipt">
					<label for="gia">Giá</label>
				<input class="input input_gia" id="gia" type="text" placeholder="Giá">
				</div>
				<button class="btn Sua_btn" type="submit" onclick="Sua()">Sửa</button>
			<!-- </form> -->
			</div>`)
			document.getElementById("link_anh").value = `${arrs[index].link_anh}`
			document.getElementById("ten_sp").value = `${arrs[index].ten_sp}`
			document.getElementById("so_luong").value = `${arrs[index].so_luong}`
			var gia = '', e = 0
			for(var j = 0; j < arrs[index].gia.length; j++)
			if(arrs[index].gia[j] === '.'){
				gia += arrs[index].gia.slice(e, j)
				e = j + 1
			}
			gia += arrs[index].gia.slice(e, arrs[index].gia.length)
			document.getElementById("gia").value = `${gia}`
			$('.Sua_btn').onclick = function (){
				if(document.getElementById("ten_sp").value === '' || 
				document.getElementById("link_anh").value === '' || 
				document.getElementById("so_luong").value === '' || 
				document.getElementById("gia").value === '') {
					return confirm("Điền số liệu!!!")
				}
				else{
					arrs[index].link_anh = document.getElementById("link_anh").value 
					arrs[index].ten_sp = document.getElementById("ten_sp").value
					arrs[index].so_luong = document.getElementById("so_luong").value
					var gia = String(document.getElementById("gia").value)
					for(var i = gia.length - 3; i > 0; i -= 3)
					gia = gia.slice(0, i) + '.' + gia.slice(i)
					arrs[index].gia = gia
					document.getElementsByClassName('sanPham')[index].outerHTML = `<div class="sanPham" align="center">
				<div class="img_sp link_anh" style="background-image: url(${arrs[index].link_anh});" ></div>
				<div class="thongTin">
					<h3 class="ten_sp">${arrs[index].ten_sp}</h3>
					<p class="sl">Số lượng:&nbsp;</p><p class="sl sl_value">${arrs[index].so_luong}</p><br>
					<p class="gia">Giá:&nbsp;</p><p class="gia gia_value">${arrs[index].gia}</p><p class="gia">&nbsp;đ</p>
					<button class="btn mua_btn" style="display: none;">Mua hàng</button>
					<button class="btn GH_btn" style="display: none;">Thêm vào giỏ hàng</button>
					<button class="btn xoa_btn"  style="display: none;">Xóa hàng</button>
					<button class="btn sua_btn"  style="display: block;">Sửa hàng</button>
				</div>
			</div>`
				}
				document.getElementById("link_anh").value = ""
				document.getElementById("ten_sp").value = ""
				document.getElementById("so_luong").value = ""
				document.getElementById("gia").value = ""
				if($('.insert') != null){ $('.insert').remove() }
				document.getElementById("insert_id").insertAdjacentHTML('beforeend', `<div class="insert">
				<!-- <form class="form" action=" "> -->
					<div align="center" class="ipt">
						<label for="ten_sp">Tên sản phẩm</label>
						<input class="input input_ten" id="ten_sp" type="text" placeholder="Tên sản phẩm">
					</div>
					<div align="center" class="ipt">
						<label for="link_anh">Link ảnh</label>
						<input class="input input_link" id="link_anh" type="text" placeholder="Link ảnh">
					</div>
					<div align="center" class="ipt">
						<label for="so_luong">Số lượng</label>
						<input class="input input_sl" id="so_luong" type="text" placeholder="Số lượng">
					</div>
					<div align="center" class="ipt">
						<label for="gia">Giá</label>
					<input class="input input_gia" id="gia" type="text" placeholder="Giá">
					</div>
					<button class="btn Them_btn" type="submit" onclick="them()">Thêm</button>
				<!-- </form> -->
				</div>`)
				Sua()
			}
		}
	})
}

function themVaoGioHang(){
	var GH_btn = Object.values($$('.GH_btn'))
	GH_btn.forEach(function(GH_btn, index){
		GH_btn.onclick = function (){
			document.getElementById("sanPhamGH").insertAdjacentHTML('beforeend', `<tr>
			<td style="display: flex; align-items: center;"><img style="width: 80px;" src="${arrs[index].link_anh}" alt="Lỗi!!!">${arrs[index].ten_sp}</td>
			<td><p><span>${arrs[index].gia}</span><sup>đ</sup></td>
			<td><input style="width: 35px;outline: none;" type="number" value="1" min="1" max="${arrs[index].so_luong}"></td>
			<td style="cursor: pointer;">Xóa</td>
			</tr>`)
			tongTien()
			var soLuong = $$('#gioHang table tbody input')
			soLuong.forEach(function(soLuong, index){
				soLuong.onchange = function(){ tongTien() }
			})
		}
	})
}
themVaoGioHang()

var soLuong = $$('#gioHang table tbody input')
soLuong.forEach(function(soLuong, index){
	soLuong.onchange = function(){ tongTien() }
})

function tongTien(){
	var soLuong = $$('#gioHang table tbody input')
	var b = $$('#gioHang table tbody span')
	
	var tongTien = 0
	for(var i = 0; i < soLuong.length; i++){
		var c = b[i].innerHTML
		var gia = '', e = 0
		for(var j = 0; j < c.length; j++)
		if(c[j] === '.'){
			gia += c.slice(e, j)
			e = j + 1
		}
		gia += c.slice(e, c.length)
		tongTien += (gia * soLuong[i].value)
	}
	tongTien = String(tongTien)
	for(var i = tongTien.length - 3; i > 0; i -= 3)
	tongTien = tongTien.slice(0, i) + '.' + tongTien.slice(i)

	if($$('.tongTien')[1] != null){ $$('.tongTien')[1].remove() }
	$('.tongTien').insertAdjacentHTML('afterend', `<td class="tongTien"><p><span>${tongTien}</span><sup>đ</sup></td>`)
}
tongTien()

//--------------------




