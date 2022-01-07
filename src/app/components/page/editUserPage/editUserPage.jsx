import React, { useEffect, useState } from "react"
import { validator } from "../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { useHistory } from "react-router"
import BackHistoryButton from "../../common/backButton"
import { useProfessions } from "../../../hooks/useProfession"
import { useAuth } from "../../../hooks/useAuth"
import { useQualities } from "../../../hooks/useQualities"
const EditUserPage = () => {
    const history = useHistory()
    const { currentUser, update } = useAuth()
    const { professions } = useProfessions()
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))

    const { qualities } = useQualities()
    console.log(professions)
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }))
    const [isLoading, setIsLoading] = useState()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    })
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { profession, qualities } = data
        try {
            await update({
                ...data,
                profession: profession,
                qualities: qualities.map((q) => q.value)
            })
            history.push(`/users/${data._id}`)
        } catch (error) {
            setErrors(error)
        }

        console.log("submit", data)
    }

    useEffect(() => {
        setIsLoading(true)

        setData((prevState) => ({
            ...prevState,
            ...currentUser,
            profession: currentUser.profession,
            qualities: qualitiesList.filter((q) =>
                currentUser.qualities.includes(q.value)
            )
        }))
    }, [])
    console.log(data)

    useEffect(() => {
        if (data._id) setIsLoading(false)
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Электронная почта введена не корректно" }
        },
        name: {
            isRequired: {
                message: "Имя обязательна для заполнения"
            },
            min: {
                message: "Имя должео состоять минимум из 3 символов",
                value: 3
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length !== 0

    return (
        <div className="container mt-3 ">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading > 0 &&
                    currentUser.qualities.length > 0 &&
                    Object.keys(professions).length > 0 &&
                    Object.keys(qualities).length > 0 ? (
                        <form onSubmit={handleSubmit} className="ms-3">
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Выбрать..."
                                options={professionsList}
                                onChange={handleChange}
                                value={currentUser.profession}
                                error={errors.profession}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                                values
                            />
                            <button
                                type="submit"
                                disabled={isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Изменить
                            </button>
                        </form>
                    ) : (
                        <h1 className="ms-3">Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
