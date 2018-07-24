import swal from 'sweetalert2/dist/sweetalert2.js'

const baseBtnClass = `
    ba bw1 br-pill bg-transparent pointer
    no-underline ttu tracked fw6
    dib pv2 ph3 pv3-ns ph4-ns
`

const cancelBtnClass = `
    ${baseBtnClass}
    b--mid-gray mid-gray
    hover-bg-mid-gray hover-white
`

const confirmBtnClass = `
    ${baseBtnClass}
`

const swalPatch = swal.mixin({
    buttonsStyling: false,
    confirmButtonClass: confirmBtnClass,
    cancelButtonClass: cancelBtnClass,
})

export default swalPatch
