<template>
	<div>
		<mt-swipe :auto="3000">
			<mt-swipe-item v-for="(banner, index) in banners" :key="index">
				<a :href="banner.extra.tourl">
					<img :src="banner.imgurl" :title="banner.title" width="310px" height="310px">
				</a>
			</mt-swipe-item>
		</mt-swipe>
		<div>{{isPlay}}</div>
		
		<mt-cell v-for="(song, index) in songList" :title="song.filename" @click.native="playAudio(index)" :key="index">
			<img src="../assets/images/download_icon.png" width="20" height="20">
		</mt-cell>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	import { PLAY_AUDIO } from '../mixins'
	import { mapGetters } from 'vuex'
	export default{
		mixins: [PLAY_AUDIO],
		data(){
			return {
				banners: [],
				songList: []
			}
		},
		mounted(){
			this.getSongs();
			
		},
		computed:{
    ...mapGetters(['isPlay']),
		},
		methods: {
			getSongs(){
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('/proxy/?json=true').then(({data}) => {
					this.banners = data.banner
					this.songList = data.data;
					console.log("data");
					console.log(data);
				}).then(() => {
					Indicator.close()
				})
			},
			
		}
	}
</script>
<style>

	.mint-swipe {
		height: 15vw !important;
		text-align: center;
	}
	
	.mint-swipe-indicator {
		width: 12px !important;
		height: 12px !important;
	}
	
	.mint-swipe-indicators {
		bottom: 5px !important;
	}

	.mint-cell{
    cursor:pointer;
	}
</style>